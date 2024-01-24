import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { existsSync } from 'fs'
import multer, { diskStorage } from 'multer'
import { join } from 'path'
import ApiError from '../../exceptions/apiError.js'
import authMiddleware from '../../middlewares/authMiddleware.js'
import validate from '../../middlewares/validateMiddleware.js'
import filesController from './files.controller.js'
import { getFilesSchema } from './files.schemas.js'

const filesRouter = Router()

const uploadsPath = 'uploads/'

const storage = diskStorage({
  destination: uploadsPath,
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

const fileFilter: multer.Options['fileFilter'] = (request, file, callback) => {
  const filePath = join(uploadsPath, file.originalname)
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

export default filesRouter
