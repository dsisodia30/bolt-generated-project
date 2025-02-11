import { Router } from 'express'
    import { EmployeeController } from '../controllers/EmployeeController'
    import { LeaveController } from '../controllers/LeaveController'
    import { PaymentController } from '../controllers/PaymentController'
    import { AuthController } from '../controllers/AuthController'
    import { validateRequest } from '../middleware/validationMiddleware'
    import { createPaymentSchema, updatePaymentSchema } from '../entities/Payment'

    const router = Router()

    // Authentication Routes
    router.post('/auth/register', new AuthController().register.bind(new AuthController()))
    router.post('/auth/login', new AuthController().login.bind(new AuthController()))

    // Employee Routes
    const employeeController = new EmployeeController()
    router.use('/employees', employeeController.router)

    // Leave Routes
    const leaveController = new LeaveController()
    router.use('/leave', leaveController.router)

    // Payment Routes
    const paymentController = new PaymentController()
    router.use('/payment', paymentController.router)

    export default router
