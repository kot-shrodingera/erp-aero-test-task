import * as z from 'zod'

export const signupSchema = z.object({
  body: z.object({
    id: z
      .string()
      .email()
      .or(z.string().regex(/^\+?\d{10,15}$/)),
    password: z.string(),
  }),
})

export type SignupSchema = z.infer<typeof signupSchema>
