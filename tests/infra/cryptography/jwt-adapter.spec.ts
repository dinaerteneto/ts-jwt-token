import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain'
import jwt from 'jsonwebtoken'
import { textChangeRangeIsUnchanged } from 'typescript'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
      return Promise.resolve('any_token')
    },
  
    async verify (): Promise<string> {
      return Promise.resolve('any_value')
    }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
    describe('decrypt', () => {
      test('Should call decrypt correct values', async () => {
        const sut = makeSut()
        const verifySpy = jest.spyOn(jwt, 'verify')
        await sut.decrypt('any_token')
        expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
      })
      test('Should return value on verify success', async () => {
        const sut = makeSut()
        const decrypt = await sut.decrypt('any_token')
        expect(decrypt).toBe('any_value')
      })
      test('Should throw if verify throw', async () => {
        const sut = makeSut()
        jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
        const decrypt = sut.decrypt('any_token')
        await expect(decrypt).rejects.toThrow()
      })
    })

    describe('encrypt', () => {
      test('Should call encrypt correct values', async () => {
        const sut = makeSut()
        const encryptSpy = jest.spyOn(jwt, 'sign')
        await sut.encrypt('any_id')
        expect(encryptSpy).toHaveBeenCalledWith({id: 'any_id'}, 'secret')
      })
      test('Should return a token on sign success', async () => {
        const sut = makeSut()
        const token = await sut.encrypt('any_id')
        expect(token).toBe('any_token')
      })
      test('Should throw if sign throws', async () => {
        const sut = makeSut()
        jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
        const token = sut.encrypt('any_id')
        expect(token).rejects.toThrow()
      })
    })
})