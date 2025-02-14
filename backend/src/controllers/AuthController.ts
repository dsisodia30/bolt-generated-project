import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
})

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.authService.register(req.body)
      res.status(201).json(result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unknown error occurred' })
      }
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      let credentials: { username: string; password: string }
      
      // Handle both JSON and form-urlencoded content types
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        credentials = {
          username: req.body.username,
          password: req.body.password
        }
      } else {
        credentials = req.body
      }

      // Validate credentials
      const parsed = loginSchema.safeParse(credentials)
      if (!parsed.success) {
        res.status(400).json({
          message: 'Invalid login data',
          details: parsed.error.issues
        })
        return
      }

      const result = await this.authService.login(credentials.username, credentials.password)
      res.json(result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unknown error occurred' })
      }
    }
  }
}
