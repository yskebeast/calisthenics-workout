# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

Monorepo with three independent sub-projects:

- `backend/` — Rails 8.1 API (Ruby 3.4.7, SQLite3)
- `frontend/` — Next.js + React 19 + TypeScript + Tailwind CSS
- `schema/` — TypeSpec API schema definitions (pnpm)

## Commands

### Backend

```bash
cd backend/
bundle install
bin/rails server
bin/rails db:migrate
bin/rails test                        # all tests
bin/rails test test/models/user_test.rb  # single test file
```

### Frontend

```bash
cd frontend/
pnpm install
pnpm dev
pnpm lint
```

### Schema

```bash
cd schema/
pnpm install
pnpm build           # compile TypeSpec → OpenAPI, then generate Rails enums
pnpm compile         # TypeSpec → openapi/openapi.yaml only
pnpm generate:enums  # openapi.yaml → backend/app/constants/enums.rb only
```

## Backend Conventions

Follow Rails naming conventions: snake_case for files/methods/variables, CamelCase for classes/modules, plural for table names and controllers.

## Schema → Rails Enum Flow

TypeSpec models are compiled to OpenAPI, then a script reads `components/schemas` to generate `backend/app/constants/enums.rb`.

Key constraint: **TypeSpec only emits schemas that are referenced by an API operation**. Models/enums defined in `schema/src/models/` must be used in a `@service` namespace with at least one `@route` + `op` in `schema/src/main.tsp`, otherwise `components/schemas` will be empty and no enums will be generated.

Generated file (`backend/app/constants/enums.rb`) is auto-generated — do not edit manually. Run `pnpm generate:enums` in `schema/` to regenerate.

## Frontend Notes

See `frontend/AGENTS.md`: this Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before writing frontend code.
