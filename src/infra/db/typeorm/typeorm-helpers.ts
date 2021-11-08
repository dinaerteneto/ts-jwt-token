import { createConnection, getConnection } from 'typeorm';

export const TypeOrmHelper = {
    async connect() {
        await createConnection();
    },

    async disconnect() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        const entityDeletionPromises = entities.map((entity) => async () => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
        await Promise.all(entityDeletionPromises);
    },
};