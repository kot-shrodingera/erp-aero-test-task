import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import validate from '../../middlewares/validateMiddleware.js'
import authController from './auth.controller.js'
import { signupSchema } from './auth.schemas.js'

const authRouter = Router()

authRouter.post(
  '/signup',
  validate(signupSchema),
  asyncHandler(authController.signup),
)

export default authRouter
