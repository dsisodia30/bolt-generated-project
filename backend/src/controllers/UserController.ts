import { BaseController } from './BaseController'
import { UserService } from '../services/UserService'
import { User } from '../entities/User' // Import User entity


    export class UserController extends BaseController<User> {
      constructor() {
        super(new UserService());
      }
    }
