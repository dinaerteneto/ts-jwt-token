import { HttpResponse } from "@/presentation/protocols";
import { UnauthorizedError } from "@/presentation/errors";

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})