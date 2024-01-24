import mysql, { type RowDataPacket } from 'mysql2/promise'
import { poolOptions } from '../../config/config.db.js'
import { UserSchema } from './users.model.js'

const pool = mysql.createPool(poolOptions)

const userService = {
  async getUser(id: string) {
    const connection = await pool.getConnection()
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [id],
    )
    if (rows.length === 0) {
      return null
    }
    const user = UserSchema.parse(rows[0])
    return user
  },

  async getUserByRefreshToken(refreshToken: string) {
    const connection = await pool.getConnection()
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE refresh_token = ?',
      [refreshToken],
    )
    if (rows.length === 0) {
      return null
    }
    const user = UserSchema.parse(rows[0])
    return user
  },
}

export default userService
