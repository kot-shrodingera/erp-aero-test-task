import * as z from 'zod'

export const getFilesSchema = z.object({
  query: z.object({
    list_size: z
      .string()
      .refine((value) => !isNaN(Number(value)), 'Not a number')
      .optional(),
    page: z
      .string()
      .refine((value) => !isNaN(Number(value)), 'Not a number')
      .optional(),
  }),
})

export type GetFilesSchema = z.infer<typeof getFilesSchema>