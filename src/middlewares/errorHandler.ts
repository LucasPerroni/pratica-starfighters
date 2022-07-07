import { Request, Response, NextFunction } from "express"

// types
const errors = {
  unauthorized: 401,
  not_found: 404,
  unprocessable: 422,
}

export function errorUnauthorized() {
  throw { type: "unauthorized" }
}

export function errorNotFound() {
  throw { type: "not_found" }
}

export function errorUnprocessable() {
  throw { type: "unprocessable" }
}

// error handler
export default function errorHandler(error, req: Request, res: Response, next: NextFunction) {
  if (error.type) {
    return res.sendStatus(errors[error.type])
  }

  res.sendStatus(500)
}
