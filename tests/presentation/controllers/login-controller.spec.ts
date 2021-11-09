import { IAuthentication } from "@/domain/usecases"
import { LoginController } from "@/presentation/controllers"

class AuthenticationStub implements IAuthentication {
    async auth(authentication: IAuthentication.Params): Promise<IAuthentication.Results> {
        return Promise.resolve({ token: 'valid_token' })
    }
}

describe('Login Controller', () => {
    test('Should call Authenticate with correct values', async () => {
        const authenticationStub = new AuthenticationStub()
        const sut = new LoginController(authenticationStub)
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        sut.handle({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
        expect(authSpy).toHaveBeenCalledWith({
            email: 'valid-email@email.com',
            password: 'valid-password'
        })
    })
    /*
    test('Should return 401 if invalid credentials are provided', async () => {})
    test('Should return 200 if valid credentials are provided', async () => {})
    */
})
