module.exports = {
  name: 'default',
  type: 'postgres',
  host:  process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dropSchema: true,
  logging: false,
  synchroize: true,
  migrationsRun: true,

  entities: ['src/infra/db/typeorm/entities/*.{js,ts}'],
  migrations: ['src/infra/db/typeorm/migrations/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/infra/db/typeorm/entities',
    migrationsDir: 'src/infra/db/typeorm/migrations',
  },
}