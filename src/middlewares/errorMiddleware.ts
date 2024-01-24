import type { NextFunction, Request, Response } from 'express'
import * as z from 'zod'
import ApiError from '../exceptions/apiError.js'

const withMessageSchema = z.object({
  message: z.string(),
})

const errorMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  // error-handling express middleware requires 4 arguments
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    response.status(error.status).json({
      message: error.message,
    })
  } else {
    const safeParseResult = withMessageSchema.safeParse(error)
    if (safeParseResult.success) {
      response.status(500).json({
        message: safeParseResult.data.message,
      })
    } else {
      response.status(500).json({
        message: 'Unknown Internal Server Error',
      })
    }
  }
  throw error // for debug in dev
}
export default errorMiddleware
