import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.env.js'
import ApiError from '../exceptions/apiError.js'
import type { UserJWTPayload } from '../modules/tokens/tokens.service.js'

const authMiddleware =
  () => (request: Request, response: Response, next: NextFunction) => {
    if (request.method === 'OPTIONS') {
      next()
      return
    }
    if (!request.headers.authorization) {
      throw ApiError.UnauthorizedError()
    }
    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      throw ApiError.BadRequest('Error extracting auth token')
    }
    const secret = config.JWT_ACCESS_SECRET
    try {
      // eslint-disable-next-line import/no-named-as-default-member
      const userPayload = jwt.verify(token, secret) as UserJWTPayload
      response.locals.user = userPayload
      next()
      return
    } catch (error) {
      // eslint-disable-next-line import/no-named-as-default-member
      if (error instanceof jwt.TokenExpiredError) {
        throw ApiError.UnauthorizedError('JWT expired')
      }
      throw error
    }
  }
export default authMiddleware
