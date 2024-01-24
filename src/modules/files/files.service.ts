import mysql, { type RowDataPacket } from 'mysql2/promise'
import { poolOptions } from '../../config/config.db.js'
import { splitFilename } from '../../utils/files.js'
import { FileDto, FileSchema } from './files.model.js'

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

  async getFiles(listSize: number, page: number) {
    const connection = await pool.getConnection()
    const [rows] = await connection.query<RowDataPacket[][]>(
      'SELECT * FROM `files` LIMIT ? OFFSET ?',
      [listSize, (page - 1) * listSize],
    )
    const files = rows.map((file) => new FileDto(FileSchema.parse(file)))
    return files
  },
}

export default filesService
