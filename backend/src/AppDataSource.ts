import { DataSource } from "typeorm";
import { createConnection } from "mysql2/promise";

export const AppDataSource = new DataSource({
    type: 'mysql',
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
});

export async function initializeDB() {
  // First connect without specifying a database
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
  });

  // Check if database exists
  const [rows] = await connection.query<import('mysql2').RowDataPacket[]>(

    `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'hrm'`
  );

  // Create database if it doesn't exist
  if (rows.length === 0) {
    await connection.query(`CREATE DATABASE hrm`);
    console.log('Database hrm created successfully');
  }

  await connection.end();
}
