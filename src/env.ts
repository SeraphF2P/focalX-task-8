import { z } from "zod";

const envSchema = z.object({
  VITE_PUBLIC_API_BASE_URL: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Environment variables validation failed.");
}

export const env = parsedEnv.data;
