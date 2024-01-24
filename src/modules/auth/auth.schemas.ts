import * as z from 'zod'

export const cookiesSchema = z.object({
  refreshToken: z.string(),
})

export const signupSchema = z.object({
  body: z.object({
    id: z
      .string()
      .email('id must be phone number or email')
      .or(z.string().regex(/^\+?\d{10,15}$/)),
    password: z.string(),
  }),
})

export type SignupSchema = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  body: z.object({
    id: z
      .string()
      .email()
      .or(z.string().regex(/^\+?\d{10,15}$/)),
    password: z.string(),
  }),
})

export type SigninSchema = z.infer<typeof signinSchema>
