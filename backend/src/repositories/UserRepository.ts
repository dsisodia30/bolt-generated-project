import { Entity, FindOneOptions } from 'typeorm'
    import { User } from '../entities/User'
    import { BaseRepository } from './BaseRepository'

    export class UserRepository extends BaseRepository<User> {
      protected getEntity(): new () => User {
        return User;
      }

      async findByUsername(username: string): Promise<User | null> {
        return await this.findOne(username, { where: { username } } as FindOneOptions<User>);
      }

      async findByEmail(email: string): Promise<User | null> {
        return await this.findOne(email, { where: { email } } as FindOneOptions<User>);
      }
    }
