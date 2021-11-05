import { Authorization } from "@/data/usecases"
import { JwtAdapter } from "@/infra/cryptography"
import { throwError } from "@/tests/domain"
import 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
      return Promise.resolve('any_token')
    },
  
    async verify (): Promise<string> {
      return Promise.resolve('any_value')
    }
}))

const makeSut = () => {
    const jwtAdapter = new JwtAdapter('secret')
    const sut = new Authorization(jwtAdapter)
    return {
        jwtAdapter,
        sut
    }
}

describe('Authorization UseCase', () => {
    test('Should call JwtAdapter with valid token', async () => {
        const { jwtAdapter, sut } = makeSut()
        const decrypt = jest.spyOn(jwtAdapter, 'decrypt')
        await sut.verify('valid_token')
        expect(decrypt).toHaveBeenCalledWith('valid_token')
    })
    test('Should return value if token is valid', async () => {
        const { jwtAdapter, sut } = makeSut()
        jest.spyOn(jwtAdapter, 'decrypt').mockReturnValueOnce(Promise.resolve('token_valided'))
        const verify = await sut.verify('valid_token')
        expect(verify).toBe('token_valided')
    })
    test('Should throws if decrypt throws', async () => {
        const { jwtAdapter, sut } = makeSut()
        jest.spyOn(jwtAdapter, 'decrypt').mockImplementationOnce(throwError)
        const verify = sut.verify('valid_token')
        await expect(verify).rejects.toThrow()
    })
})
