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

export const getFileSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), 'Not a number'),
  }),
})

export type GetFileSchema = z.infer<typeof getFileSchema>

export const deleteFilesSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), 'Not a number'),
  }),
})

export type DeleteFilesSchema = z.infer<typeof deleteFilesSchema>

export const downloadFileSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), 'Not a number'),
  }),
})

export type DownloadFileSchema = z.infer<typeof downloadFileSchema>
