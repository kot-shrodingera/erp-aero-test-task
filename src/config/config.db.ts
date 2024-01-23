import type { PoolOptions } from 'mysql2'
import { config } from './config.env.js'

export const poolOptions: PoolOptions = {
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
}
