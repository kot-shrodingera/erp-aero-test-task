import type { Response } from 'express'
// import { config } from '../../config/config.env.js'
import type { ValidatedRequest } from '../../types.js'
import type { SigninSchema, SignupSchema } from './auth.schemas.js'
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
}

export default authController
