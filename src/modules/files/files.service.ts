import { existsSync } from 'fs'
import { unlink } from 'fs/promises'
import mysql, { type ResultSetHeader, type RowDataPacket } from 'mysql2/promise'
import { join } from 'path'
import { poolOptions } from '../../config/config.db.js'
import { config } from '../../config/config.env.js'
import ApiError from '../../exceptions/apiError.js'
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
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM `files` LIMIT ? OFFSET ?',
      [listSize, (page - 1) * listSize],
    )
    const files = rows.map((file) => new FileDto(FileSchema.parse(file)))
    return files
  },

  async getFile(id: number) {
    const connection = await pool.getConnection()
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM `files` WHERE id = ?',
      [id],
    )
    if (rows.length === 0) {
      return null
    }
    const file = FileSchema.parse(rows[0])
    return file
  },

  async deleteFile(id: number) {
    const file = await this.getFile(id)
    if (file === null) {
      throw ApiError.BadRequest(`No file with id ${id} found`)
    }
    const connection = await pool.getConnection()
    const [deleted] = await connection.execute<ResultSetHeader>(
      'DELETE FROM `files` WHERE id = ? LIMIT 1',
      [id],
    )
    if (deleted.affectedRows === 0) {
      throw ApiError.BadRequest(`Could not delete file with id ${id}`)
    }
    const filename = `${file.name}${file.extension}`
    const filePath = join(config.UPLOADS_PATH, filename)
    await unlink(filePath)
  },

  async getFilePath(id: number) {
    const file = await this.getFile(id)
    if (file === null) {
      throw ApiError.BadRequest(`No file with id ${id} found`)
    }
    const filename = `${file.name}${file.extension}`
    const filePath = join(config.UPLOADS_PATH, filename)
    if (!existsSync(filePath)) {
      throw new ApiError(500, `Local file with id ${id} not found`)
    }
    return filePath
  },
}

export default filesService
