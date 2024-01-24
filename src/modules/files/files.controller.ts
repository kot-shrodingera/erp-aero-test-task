import type { Request, Response } from 'express'
import filesService from './files.service.js'

const filesController = {
  upload: async (request: Request, response: Response) => {
    const file = request.file
    if (!file) {
      throw new Error('Error uploading file')
    }
    await filesService.upload(file)
    response.json({
      message: `File ${file.originalname} uploaded successfully`,
    })
  },
}

export default filesController
