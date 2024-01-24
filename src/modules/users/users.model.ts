import * as z from 'zod'

export const UserSchema = z.object({
  id: z
    .string()
    .email()
    .or(z.string().regex(/^\+?\d{10,15}$/)),
  password: z.string(),
  create_time: z.date(),
  refresh_token: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>
