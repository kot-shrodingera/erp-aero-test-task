import type { Response } from 'express'
import type { ValidatedRequest } from '../../types.js'
import type { SignupSchema } from './auth.schemas.js'
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
}

export default authController
