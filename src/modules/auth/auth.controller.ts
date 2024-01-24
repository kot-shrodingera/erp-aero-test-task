import type { Request, Response } from 'express'
// import { config } from '../../config/config.env.js'
import type { ResponseWithAuth } from '../../middlewares/authMiddleware.js'
import type { ValidatedRequest } from '../../types.js'
import {
  cookiesSchema,
  type SigninSchema,
  type SignupSchema,
} from './auth.schemas.js'
import authService from './auth.service.js'

const authController = {
  signup: async (
    request: ValidatedRequest<SignupSchema>,
    response: Response,
  ) => {
    const {
      body: { id, password },
    } = request
    await authService.signup(id, password)
    response.json({
      message: `User ${id} successfuly registered`,
    })
  },

  signin: async (
    request: ValidatedRequest<SigninSchema>,
    response: Response,
  ) => {
    const {
      body: { id, password },
    } = request
    const { accessToken, refreshToken, user } = await authService.signin(
      id,
      password,
    )
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      // secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    response.json({
      user,
      accessToken,
    })
  },

  info: (request: Request, response: ResponseWithAuth) => {
    const { id } = response.locals.user
    response.json({
      id,
    })
  },

  refresh: async (request: Request, response: Response) => {
    const { refreshToken } = cookiesSchema.parse(request.cookies)
    const { accessToken, user } = await authService.refresh(refreshToken)
    response.json({
      message: 'accessToken successfuly updated',
      user,
      accessToken,
    })
  },
}

export default authController
