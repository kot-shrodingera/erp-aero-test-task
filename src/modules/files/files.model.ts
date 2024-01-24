import * as z from 'zod'

export const FileSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  extension: z.string(),
  mimetype: z.string(),
  size: z.number().int(),
  upload_time: z.date(),
})

export type File = z.infer<typeof FileSchema>

export class FileDto {
  id: File['id']
  name: File['name']
  extension: File['extension']
  mimetype: File['mimetype']
  size: File['size']
  uploadTime: File['upload_time']

  constructor(file: File) {
    this.id = file.id
    this.name = file.name
    this.extension = file.extension
    this.mimetype = file.mimetype
    this.size = file.size
    this.uploadTime = file.upload_time
  }
}
