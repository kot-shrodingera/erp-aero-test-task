import jwt from 'jsonwebtoken'
import { config } from '../../config/config.env.js'
import type { UserDto } from '../users/users.model.js'

export type UserJWTPayload = UserDto

const tokenService = {
  generateAccessToken: (payload: UserJWTPayload) => {
    const accessSecret = config.JWT_ACCESS_SECRET
    // eslint-disable-next-line import/no-named-as-default-member
    return jwt.sign(payload, accessSecret, {
      expiresIn: '10m',
    })
  },

  generateRefreshToken: (payload: UserJWTPayload) => {
    const refreshSecret = config.JWT_REFRESH_SECRET
    // eslint-disable-next-line import/no-named-as-default-member
    return jwt.sign(payload, refreshSecret, {
      expiresIn: '30d',
    })
  },
}

export default tokenService
