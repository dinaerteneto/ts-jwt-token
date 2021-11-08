import { TypeOrmHelper as sut } from '@/infra/db'
import { User } from '@/infra/db/typeorm';

describe('TypeOrm Connection', () => {
    beforeAll(async () => {
        await sut.connect()
    })
    
    afterAll(async () => {
        await sut.disconnect()
    })
    
    beforeEach(async () => {
        await sut.clear();
      });    

    test('Should verify connect sucessfull', async () => {
        let account = await User.findOne({}) || null
        expect(account).toBeNull()
    })
})
