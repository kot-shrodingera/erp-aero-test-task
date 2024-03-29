import type { Request, Response } from 'express'
import ApiError from '../../exceptions/apiError.js'
import type { ValidatedRequest } from '../../types.js'
import type {
  DeleteFilesSchema,
  DownloadFileSchema,
  GetFileSchema,
  GetFilesSchema,
  UpdateFileSchema,
} from './files.schemas.js'
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

  getFile: async (
    request: ValidatedRequest<GetFileSchema>,
    response: Response,
  ) => {
    const id = Number(request.params.id)
    const result = await filesService.getFile(id)
    if (result === null) {
      throw ApiError.BadRequest(`File with id ${id} not found`)
    }
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

  downloadFile: async (
    request: ValidatedRequest<DownloadFileSchema>,
    response: Response,
  ) => {
    const id = Number(request.params.id)
    const filePath = await filesService.getFilePath(id)
    response.download(filePath)
  },

  updateFile: async (
    request: ValidatedRequest<UpdateFileSchema>,
    response: Response,
  ) => {
    const file = request.file
    if (!file) {
      throw new ApiError(500, 'Error uploading file')
    }
    const id = Number(request.params.id)
    await filesService.updateFile(id, file)
    response.json({
      message: `File with id ${id} updated successfully`,
    })
  },
}

export default filesController
