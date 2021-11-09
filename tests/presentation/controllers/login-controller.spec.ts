import { IAuthentication } from "@/domain/usecases"
import { LoginController } from "@/presentation/controllers"
import { unauthorized, ok, serverError } from "@/presentation/http"
import { throwError } from "@/tests/domain"

class AuthenticationStub implements IAuthentication {
    async auth(authentication: IAuthentication.Params): Promise<IAuthentication.Results> {
        return Promise.resolve({ token: 'valid_token' })
    }
}

const makeSut = () => {
    const authenticationStub = new AuthenticationStub()
    const sut = new LoginController(authenticationStub)
    return {
        authenticationStub,
        sut
    }
}

describe('Login Controller', () => {
    test('Should call Authenticate with correct values', async () => {
        const { authenticationStub, sut } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        await sut.handle({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
        expect(authSpy).toHaveBeenCalledWith({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
    })
    test('Should return 401 if invalid credentials are provided', async () => {
        const { authenticationStub, sut } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
        const httpResponse = await sut.handle({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
        expect(httpResponse).toEqual(unauthorized())
    })
    test('Should return 200 if valid credentials are provided', async () => {
        const { authenticationStub, sut } = makeSut()
        jest.spyOn(authenticationStub, 'auth')
        const httpResponse = await sut.handle({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
        expect(httpResponse).toEqual(ok({ 'token': 'valid_token' }))
    })
    test('Should return 500 if Authenticate throws', async () => {
        const { authenticationStub, sut } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
