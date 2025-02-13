import { NextFunction, Request, Response } from 'express'
    import { z } from 'zod'

    export const validateRequest = (schema: z.ZodSchema) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          const parsed = schema.safeParse(req.body)
          if (!parsed.success) {
            throw parsed.error
          }
          req.body = parsed.data
          next()
        } catch (error: any) {
          res.status(400).json({
            message: 'Invalid request data',
            details: error.issues
          })
        }
      }
    }
