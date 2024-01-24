import type { Request } from 'express'

type ValidateSchema = {
  params?: unknown
  body?: unknown
  query?: unknown
}

export type ValidatedRequest<T extends ValidateSchema> = Request<
  T extends { params: unknown } ? T['params'] : never,
  never,
  T extends { body: unknown } ? T['body'] : never,
  T extends { query: unknown } ? T['query'] : never
>
