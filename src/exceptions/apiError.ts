class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  static UnauthorizedError(message?: string) {
    return new ApiError(401, message ?? 'User is not authorized')
  }

  static ForbiddenError() {
    return new ApiError(403, 'Forbidden')
  }

  static BadRequest(message: string) {
    return new ApiError(400, message)
  }
}

export default ApiError
