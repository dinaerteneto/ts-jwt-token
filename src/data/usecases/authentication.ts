import { Authentication } from "@/domain/usecases/authentication"
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account"
import { HashComparer, Encrypter } from "@/data/protocols/cryptography"

export class Authencation implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) { }

    async auth(authentication: Authentication.Params): Promise<Authentication.Results> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(account.id)
                return {
                    id: account.id,
                    token: accessToken
                }
            }
        }
        return null
    }
}