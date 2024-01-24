import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'
import { config } from './config/config.env.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import authRouter from './modules/auth/auth.router.js'
import filesRouter from './modules/files/files.router.js'

const app = express()
const { SV_PORT } = config

app.use(json())
app.use(cookieParser())
app.use(cors())
app.use('/', authRouter)
app.use('/file', filesRouter)
app.use(errorMiddleware)

app.listen(SV_PORT, () => {
  console.log(`Example app listening on port ${SV_PORT}`)
})
