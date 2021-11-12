import { IAuthentication } from "@/domain/usecases";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { ok, serverError, unauthorized } from "@/presentation/http";

export class LoginController implements Controller{

    constructor(private readonly authentication: IAuthentication) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        try {
            const { email, password } = httpRequest
            const auth = await this.authentication.auth({ email, password })
            if (!auth) {
                return unauthorized()
            }
            return ok(auth)
        } catch (error) {
            return serverError(error)
        }
    }
}