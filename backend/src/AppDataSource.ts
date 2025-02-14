import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql', // Change to your database type
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'hrm',
    entities: [__dirname + '/entities/*.{js,ts}'],
    migrations: [__dirname + '/migrations/*.ts'],
    logging: true,
    migrationsRun: true,
    migrationsTableName: 'migrations'
  })
  