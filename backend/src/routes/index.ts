import { Router } from 'express'
    import apiRoutes from './apiRoutes'
    
    const router = Router()

    // API Routes
    router.use('/api', apiRoutes)

    export default router
