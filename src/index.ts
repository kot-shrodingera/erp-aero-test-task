import express from 'express'
import { config } from './config/config.env.js'

const app = express()
const { SV_PORT } = config

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(SV_PORT, () => {
  console.log(`Example app listening on port ${SV_PORT}`)
})
