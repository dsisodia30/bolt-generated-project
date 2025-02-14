import 'reflect-metadata'
import { createConnection, DataSource } from 'typeorm'
import express, { Application } from 'express'
import cors from 'cors'
import apiRoutes from './routes/apiRoutes'
import routes from './routes'
import { AppDataSource, initializeDB } from './AppDataSource'


    const app: Application = express()

    // Middleware
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Routes
    app.use('/api', apiRoutes)

    // Database connection
// export const AppDataSource = new DataSource({
//   type: 'mysql', // Change to your database type
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'hrm',
//   entities: [__dirname + '/entities/*.{js,ts}'],
//   migrations: [__dirname + '/migrations/*.ts'],
//   logging: true,
//   migrationsRun: true,
//   migrationsTableName: 'migrations'
// })

initializeDB()
  .then(() => AppDataSource.initialize())
  .then(() => {
    console.log('Database connection established')
    
    // Routes
    app.use('/api', apiRoutes)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => console.error('Error connecting to database:', err));
