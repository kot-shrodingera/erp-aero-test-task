import type { NextFunction, Request, Response } from 'express'
import * as z from 'zod'

const validate =
  (schema: z.AnyZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    schema.parse(request)
    next()
  }

export default validate
