import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    timezone: "Z",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
  plugins: [nextCookies()],
});
