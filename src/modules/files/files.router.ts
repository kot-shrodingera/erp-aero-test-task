import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { existsSync } from 'fs'
import multer, { diskStorage } from 'multer'
import { join } from 'path'
import { config } from '../../config/config.env.js'
import ApiError from '../../exceptions/apiError.js'
import authMiddleware from '../../middlewares/authMiddleware.js'
import validate from '../../middlewares/validateMiddleware.js'
import filesController from './files.controller.js'
import {
  deleteFilesSchema,
  getFileSchema,
  getFilesSchema,
} from './files.schemas.js'

const filesRouter = Router()

const storage = diskStorage({
  destination: config.UPLOADS_PATH,
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

const fileFilter: multer.Options['fileFilter'] = (request, file, callback) => {
  const filePath = join(config.UPLOADS_PATH, file.originalname)
  if (existsSync(filePath)) {
    callback(ApiError.BadRequest(`File ${file.originalname} already exists`))
  } else {
    callback(null, true)
  }
}

const upload = multer({ storage: storage, fileFilter })

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

export default filesRouter
