import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/AuthService'
import { User } from '../entities/User'

export class AuthController {
  private authService = new AuthService()

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.register(req.body)
      res.status(201).json({ user, token: user.token })
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.login(req.body.username, req.body.password)
      res.json({ user: result.user, token: result.token })
    } catch (error: any) {
      res.status(401).json({ message: (error as Error).message })
    }
  }
}
