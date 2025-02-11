import { NextFunction, Request, Response } from 'express'
    import { z } from 'zod'

    export const validateRequest = (schema: z.ZodSchema) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          const parsed = schema.parse(req.body)
          next()
        } catch (error) {
          res.status(400).json({
            message: 'Invalid request data',
            details: (error as any).issues
          })
        }
      }
    }
