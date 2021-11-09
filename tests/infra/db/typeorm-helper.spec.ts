import { TypeOrmHelper as sut } from '@/infra/db'
import { User } from '@/infra/db/typeorm';
import { getConnection } from 'typeorm';

describe('TypeOrm Connection', () => {

    beforeAll(async () => {
        await sut.connect()
    })

    afterAll(async () => {
        await sut.disconnect()
    })

    test('Should verify connect sucessfull', async () => {
        let connection = getConnection()
        expect(connection.isConnected).toBeTruthy()

        const user = await User.find({})
        expect(user).toBeTruthy()
    })
})
