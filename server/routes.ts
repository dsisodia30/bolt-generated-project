import { Router } from 'express'
    import { EmployeeController } from './controllers/EmployeeController'
    import { AuthController } from './controllers/AuthController'
    import { validateRequest } from './middleware/validationMiddleware'
    import { createEmployeeSchema, updateEmployeeSchema } from './entities/Employee'

    const router = Router()

    // Authentication Routes
    router.post('/api/auth/register', new AuthController().register.bind(new AuthController()))
    router.post('/api/auth/login', new AuthController().login.bind(new AuthController()))

    // Employee Routes
    router.get('/api/employees', new EmployeeController().getAll.bind(new EmployeeController()))
    router.get('/api/employees/:id', new EmployeeController().getOne.bind(new EmployeeController()))
    router.post('/api/employees', validateRequest(createEmployeeSchema), new EmployeeController().create.bind(new EmployeeController()))
    router.put('/api/employees/:id', validateRequest(updateEmployeeSchema), new EmployeeController().update.bind(new EmployeeController()))
    router.post('/api/employees/:id/document', new EmployeeController().uploadDocument.bind(new EmployeeController()))
    router.post('/api/employees/:id/leave', new EmployeeController().requestLeave.bind(new EmployeeController()))
    router.post('/api/employees/:id/attendance', new EmployeeController().logAttendance.bind(new EmployeeController()))

    export default router
