import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import multer, { memoryStorage } from 'multer'
import authMiddleware from '../../middlewares/authMiddleware.js'
import validate from '../../middlewares/validateMiddleware.js'
import filesController from './files.controller.js'
import {
  deleteFilesSchema,
  downloadFileSchema,
  getFileSchema,
  getFilesSchema,
  updateFileSchema,
} from './files.schemas.js'

const filesRouter = Router()

const storage = memoryStorage()

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

filesRouter.put(
  '/update/:id',
  authMiddleware(),
  upload.single('file'),
  validate(updateFileSchema),
  asyncHandler(filesController.updateFile),
)

export default filesRouter
