import 'reflect-metadata'
    import { createConnection, DataSource } from 'typeorm'
    import express, { Application } from 'express'
    import cors from 'cors'
import apiRoutes from './routes/apiRoutes'
    import routes from './routes'

    const app: Application = express()

    // Middleware
    app.use(cors())
    app.use(express.json())

    // Routes
    app.use('/api', apiRoutes)

    // Database connection
const AppDataSource = new DataSource({
  type: 'mysql', // Change to your database type
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'hrm',
  entities: [__dirname + '/entities/*.ts'],
  synchronize: true,
  logging: true
})

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => console.error('Error connecting to database:', err));
    