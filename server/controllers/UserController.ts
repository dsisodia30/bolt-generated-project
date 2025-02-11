import { BaseController } from './BaseController'
    import { UserService } from '../services/UserService'

    export class UserController extends BaseController<User> {
      constructor() {
        super(new UserService());
      }
    }
