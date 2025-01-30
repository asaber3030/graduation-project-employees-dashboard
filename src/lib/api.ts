import { NextResponse } from "next/server"

export const responseCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  serverError: 500,
}

export function actionResponse<T>(status: number, message: string, data?: T) {
  return {
    message,
    data,
    status,
  }
}

export function response<T, P>(status: number, message: string, data?: T, errors?: P) {
  return NextResponse.json(
    {
      message,
      data,
      status,
      errors,
    },
    { status }
  )
}

export function getHeaders(token?: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
