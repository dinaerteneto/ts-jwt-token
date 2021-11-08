import { IAuthentication } from "@/domain/usecases"
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account"
import { HashComparer, Encrypter } from "@/data/protocols/cryptography"

export class Authencation implements IAuthentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) { }

    async auth(authentication: IAuthentication.Params): Promise<IAuthentication.Results> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(account.id)
                return {
                    token: accessToken
                }
            }
        }
        return null
    }
}