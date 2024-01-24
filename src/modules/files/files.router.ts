import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import multer, { diskStorage } from 'multer'
import { config } from '../../config/config.env.js'
import authMiddleware from '../../middlewares/authMiddleware.js'
import validate from '../../middlewares/validateMiddleware.js'
import { splitFilename } from '../../utils/files.js'
import filesController from './files.controller.js'
import {
  deleteFilesSchema,
  downloadFileSchema,
  getFileSchema,
  getFilesSchema,
} from './files.schemas.js'

const filesRouter = Router()

const storage = diskStorage({
  destination: config.UPLOADS_PATH,
  filename: (req, file, callback) => {
    const { name, extension } = splitFilename(file.originalname)
    const uniqueSuffix = Math.round(Math.random() * 1e4)
      .toString()
      .padStart(4, '0')
    callback(null, `${name}-${uniqueSuffix}${extension}`)
  },
})

const upload = multer({ storage })

filesRouter.post(
  '/upload',
  authMiddleware(),
  upload.single('file'),
  asyncHandler(filesController.upload),
)

filesRouter.get(
  '/list',
  authMiddleware(),
  validate(getFilesSchema),
  asyncHandler(filesController.getFiles),
)

filesRouter.get(
  '/:id',
  authMiddleware(),
  validate(getFileSchema),
  asyncHandler(filesController.getFile),
)

filesRouter.delete(
  '/delete/:id',
  authMiddleware(),
  validate(deleteFilesSchema),
  asyncHandler(filesController.deleteFile),
)

filesRouter.get(
  '/download/:id',
  authMiddleware(),
  validate(downloadFileSchema),
  asyncHandler(filesController.downloadFile),
)

export default filesRouter
