import { NextFunction, Request, Response } from 'express'
    import { z } from 'zod'
    import { parse } from 'zod-validation-error'

    export const validateRequest = (schema: z.ZodSchema) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          const parsed = parse(req.body, schema)
          req.body = parsed
          next()
        } catch (error) {
          res.status(400).json({
            message: 'Invalid request data',
            details: error.issues
          })
        }
      }
    }
