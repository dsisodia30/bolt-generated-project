import 'reflect-metadata'
    import { createConnection } from 'typeorm'
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
    createConnection({
      type: 'sqlite',
      database: 'hrm.db',
      entities: [__dirname + '/entities/*.ts'],
      synchronize: true
    }).then(() => {
      const PORT = process.env.PORT || 5000
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    }).catch(err => console.error('Error connecting to database:', err))
