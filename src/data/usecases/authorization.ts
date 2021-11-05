import { IAuthorization } from "@/domain/usecases";
import { JwtAdapter } from "@/infra/cryptography";

export class Authorization implements IAuthorization {

    constructor(private readonly jwtAdapter: JwtAdapter) {}

    async verify(value: string): Promise<string> {
        return this.jwtAdapter.decrypt(value)
    }
}