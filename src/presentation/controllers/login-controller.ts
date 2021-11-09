import { IAuthentication } from "@/domain/usecases";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class LoginController implements Controller{

    constructor(private readonly authentication: IAuthentication) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        const { email, password } = httpRequest
        const auth = this.authentication.auth({ email, password })
        return {
            statusCode: 200,
            body: auth
        }
    }
}