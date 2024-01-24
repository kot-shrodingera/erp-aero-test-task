import mysql from 'mysql2/promise'
import { poolOptions } from '../../config/config.db.js'
import { splitFilename } from '../../utils/files.js'

const pool = mysql.createPool(poolOptions)

const filesService = {
  async upload({ originalname, mimetype, size }: Express.Multer.File) {
    const { name, extension } = splitFilename(originalname)
    const connection = await pool.getConnection()
    await connection.execute(
      'INSERT INTO `files`(`name`, `extension`, `mimetype`, `size`) VALUES (?, ?, ?, ?)',
      [name, extension, mimetype, size],
    )
  },
}

export default filesService
