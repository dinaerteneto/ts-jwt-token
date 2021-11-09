import { HttpResponse } from "@/presentation/protocols";
import { UnauthorizedError, ServerError } from "@/presentation/errors";

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack)
})