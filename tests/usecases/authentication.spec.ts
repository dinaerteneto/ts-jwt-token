import { HashComparer, Encrypter } from "@/data/protocols/cryptography"
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository"
import { Authencation } from "@/data/usecases/authentication"
import { throwError } from "@/tests/domain"

describe('Authentication UseCase', () => {
    
    const mockAuthencation = {
        email: 'valid_email@email.com.br', 
        password: 'valid_password'
    }

    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Results> {
            return Promise.resolve({
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@email.com.br',
                password: 'valid_password'
            })
        }
    }

    class HashComparerStub implements HashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }

    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return Promise.resolve('string_encrypted')
        }
    }

    const makeSut = () => {
        const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
        const hashComparerStub = new HashComparerStub()
        const encrypterStub = new EncrypterStub()
        const sut = new Authencation(
            loadAccountByEmailRepositoryStub,
            hashComparerStub,
            encrypterStub
        )
        return {
            loadAccountByEmailRepositoryStub,
            hashComparerStub,
            encrypterStub,
            sut
        }
    }

    describe('LoadAccountByEmailRepository', () => {
        test('Should call LoadAccountByEmailRepository with correct email', async () => {      
            const { loadAccountByEmailRepositoryStub, sut } = makeSut()
            const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
            sut.auth(mockAuthencation)
            expect(loadSpy).toHaveBeenCalledWith('valid_email@email.com.br')
        })
        test('Should return null with LoadAccountByEmailRepository returns null', async () => {
            const { loadAccountByEmailRepositoryStub, sut } = makeSut()
            jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
            const account = await sut.auth(mockAuthencation)
            expect(account).toBeNull()
        })
        test('Should throws if LoadAccountByEmailRepository return throws', async () => {
            const { loadAccountByEmailRepositoryStub, sut } = makeSut()
            jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
            const account = sut.auth(mockAuthencation)
            await expect(account).rejects.toThrow()
        })
    })

    describe('HashComparer', () => {
        test('Should call HashComparer with correct values', async () => {
            const { hashComparerStub, sut } = makeSut()
            const compareSpy = jest.spyOn(hashComparerStub, 'compare')
            await sut.auth(mockAuthencation)
            await expect(compareSpy).toHaveBeenCalledWith('valid_password', 'valid_password')
        })
        test('Should return null if HashComparer returns false', async () => {
            const { hashComparerStub, sut } = makeSut()
            jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(null))
            const hash = await sut.auth(mockAuthencation)
            expect(hash).toBeNull()
        })
        test('Should throw if HashComparer throws', async() => {
            const { hashComparerStub, sut } = makeSut()
            jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError)
            const hash = sut.auth(mockAuthencation)
            await expect(hash).rejects.toThrow()
        })
    })
    
    describe('Encrypter', () => {
        test('Should call Encrypter with correct id', async () => {
            const { encrypterStub, sut } = makeSut()
            const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
            await sut.auth(mockAuthencation)
            await expect(encrypterSpy).toHaveBeenCalledWith('valid_id')
        })
        test('Should return token with correct id', async () => {
            const { sut } = makeSut()
            const encrypt = await sut.auth(mockAuthencation)
            expect(encrypt).toEqual({id: "valid_id", token: "string_encrypted"})
        })
        test('Should throw if Encrypter throws', async () => {
            const { encrypterStub, sut } = makeSut()
            jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
            const encrypt = sut.auth(mockAuthencation)
            await expect(encrypt).rejects.toThrow()
        })
    })
})
