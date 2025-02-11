import { Request, Response, NextFunction } from 'express'
    import { AuthService } from '../services/AuthService'

    const authService = new AuthService()

    export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer', '')
        if (!token) throw new Error('Access denied. No token provided.')

        const decoded = await authService.verifyToken(token)
        req.user = decoded
        next()
      } catch (error) {
        res.status(401).json({ message: error.message })
      }
    }

    export const authorize = (permission: string) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (!req.user) throw new Error('Access denied. No user found.')
          
          const hasAccess = await authService.checkPermission(req.user.userId, permission)
          if (!hasAccess) {
            throw new Error('Access denied. Insufficient permissions.')
          }
          
          next()
        } catch (error) {
          res.status(403).json({ message: error.message })
        }
      }
    }
