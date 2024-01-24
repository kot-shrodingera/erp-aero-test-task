import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import authMiddleware from '../../middlewares/authMiddleware.js'
import validate from '../../middlewares/validateMiddleware.js'
import authController from './auth.controller.js'
import { signinSchema, signupSchema } from './auth.schemas.js'

const authRouter = Router()

authRouter.post(
  '/signup',
  validate(signupSchema),
  asyncHandler(authController.signup),
)

authRouter.post(
  '/signin',
  validate(signinSchema),
  asyncHandler(authController.signin),
)

authRouter.get('/info', authMiddleware(), authController.info)

authRouter.post('/signin/new_token', asyncHandler(authController.refresh))

export default authRouter
