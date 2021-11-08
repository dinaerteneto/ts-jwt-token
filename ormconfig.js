module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ts-jwt-token',
  dropSchema: true,
  logging: false,
  synchroize: true,
  migrationsRun: true,

  entities: ['src/infra/db/typeorm/entities/*.ts'],
  migrations: ['src/infra/db/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/infra/db/typeorm/entities',
    migrationsDir: 'src/infra/db/typeorm/migrations',
  },
};