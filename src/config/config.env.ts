import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  SV_PORT: z
    .string()
    .transform(Number)
    .refine((value) => !isNaN(value), 'Not a number')
    .default('3000'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z
    .string()
    .transform(Number)
    .refine((value) => !isNaN(value), 'Not a number')
    .default('3306'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('root'),
  DB_DATABASE: z.string().default('test'),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  UPLOADS_PATH: z.string().default('uploads/'),
})

export const config = envSchema.parse(process.env)
