import { compareSync, hashSync } from 'bcrypt'
import mysql from 'mysql2/promise'
import { poolOptions } from '../../config/config.db.js'
import ApiError from '../../exceptions/apiError.js'
import tokenService from '../tokens/tokens.service.js'
import { UserDto } from '../users/users.model.js'
import userService from '../users/users.service.js'

const pool = mysql.createPool(poolOptions)

const authService = {
  async signup(id: string, password: string) {
    const user = await userService.getUser(id)
    if (user) {
      throw ApiError.BadRequest(`User ${id} already exists`)
    }
    const passwordHash = hashSync(password, 7)
    const connection = await pool.getConnection()
    await connection.execute(
      'INSERT INTO `users`(`id`, `password`) VALUES (?, ?)',
      [id, passwordHash],
    )
  },

  async signin(id: string, password: string) {
    const user = await userService.getUser(id)
    if (!user) {
      throw ApiError.BadRequest(`User ${id} not found`)
    }
    const isPasswordValid = compareSync(password, user.password)
    if (!isPasswordValid) {
      throw ApiError.BadRequest('Wrong password')
    }
    const userDto = new UserDto(user)
    // jwt exprects POJOs, not classes
    const accessToken = tokenService.generateAccessToken({ ...userDto })
    const refreshToken = tokenService.generateRefreshToken({ ...userDto })
    const connection = await pool.getConnection()
    await connection.execute(
      'UPDATE `users` SET `refresh_token` = ? WHERE `id` = ? LIMIT 1',
      [refreshToken, id],
    )
    return {
      accessToken,
      refreshToken,
      user: userDto,
    }
  },

  async refresh(refreshToken: string) {
    const user = await userService.getUserByRefreshToken(refreshToken)
    if (!user) {
      throw ApiError.BadRequest(
        `User with refresh token ${refreshToken} not found`,
      )
    }
    const userDto = new UserDto(user)
    // jwt exprects POJOs, not classes
    const accessToken = tokenService.generateAccessToken({ ...userDto })
    return {
      accessToken,
      user: userDto,
    }
  },
}

export default authService
