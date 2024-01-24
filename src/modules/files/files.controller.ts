import type { Request, Response } from 'express'
import ApiError from '../../exceptions/apiError.js'
import type { ValidatedRequest } from '../../types.js'
import type { DeleteFilesSchema, GetFilesSchema } from './files.schemas.js'
import filesService from './files.service.js'

const filesController = {
  upload: async (request: Request, response: Response) => {
    const file = request.file
    if (!file) {
      throw new ApiError(500, 'Error uploading file')
    }
    await filesService.upload(file)
    response.json({
      message: `File ${file.originalname} uploaded successfully`,
    })
  },

  getFiles: async (
    request: ValidatedRequest<GetFilesSchema>,
    response: Response,
  ) => {
    const listSize = request.query.list_size
      ? Number(request.query.list_size)
      : 10
    const page = request.query.page ? Number(request.query.page) : 1
    const result = await filesService.getFiles(listSize, page)
    response.json(result)
  },

  deleteFile: async (
    request: ValidatedRequest<DeleteFilesSchema>,
    response: Response,
  ) => {
    const id = Number(request.params.id)
    await filesService.deleteFile(id)
    response.json({
      message: `File with id ${id} successfully deleted`,
    })
  },
}

export default filesController
