import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  SV_PORT: z
    .string()
    .transform(Number)
    .refine((value) => !isNaN(value), 'Not a number')
    .default('3000'),
})

export const config = envSchema.parse(process.env)
