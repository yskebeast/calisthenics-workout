#!/usr/bin/env node
// AUTO-GENERATOR: OpenAPI enum -> Rails constants
// Usage: node scripts/generate_rails_enums.mjs

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { parse } from "yaml";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const openapiPath = resolve(__dirname, "../openapi/openapi.yaml");
const outputPath = resolve(__dirname, "../../backend/app/constants/enums.rb");

const doc = parse(readFileSync(openapiPath, "utf8"));
const schemas = doc?.components?.schemas ?? {};

// Collect enum schemas
const enums = Object.entries(schemas).filter(
  ([, schema]) => schema.enum != null,
);

if (enums.length === 0) {
  console.log("No enums found in openapi.yaml");
  process.exit(0);
}

function toConstName(value) {
  return String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "_");
}

// "WorkoutType" -> "WORKOUT_TYPE"
function toSnakeUpperCase(str) {
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/^_/, "")
    .toUpperCase();
}

// "TestModel.WorkoutType" -> { namespace: "TestModel", name: "WORKOUT_TYPE" }
function parseSchemaName(schemaName) {
  const parts = schemaName.split(".");
  const name = toSnakeUpperCase(parts.pop());
  const namespace = parts.join("") || "Global";
  return { namespace, name };
}

// Group enums by namespace
const grouped = {};
for (const [schemaName, schema] of enums) {
  const { namespace, name } = parseSchemaName(schemaName);
  if (!grouped[namespace]) grouped[namespace] = [];
  grouped[namespace].push({ name, schema });
}

const lines = [
  "# frozen_string_literal: true",
  "",
  "# AUTO-GENERATED from schema/openapi/openapi.yaml",
  "# Do NOT edit manually. Run `pnpm generate:enums` in schema/",
  "",
  "module Enums",
];

for (const [namespace, entries] of Object.entries(grouped)) {
  lines.push(`  module ${namespace}`);
  for (const { name, schema } of entries) {
    const hashPairs = schema.enum
      .map((v) => `${String(v).replace(/[^a-zA-Z0-9]/g, "_")}: "${v}"`)
      .join(", ");
    lines.push(`    ${name} = { ${hashPairs} }.freeze`);
  }
  lines.push("  end");
  lines.push("");
}

lines.push("end");
lines.push("");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, lines.join("\n"));
console.log(`Generated: ${outputPath}`);
