import { defineConfig } from "orval";

export default defineConfig({
  calisthenicsWorkout: {
    input: "../schema/openapi/openapi.yaml",
    output: {
      mode: "tags-split",
      target: "./lib/api",
      client: "fetch",
      clean: true,
    },
  },
});
