import { Entity } from 'typeorm'
    import { User } from '../entities/User'
    import { BaseRepository } from './BaseRepository'

    export class UserRepository extends BaseRepository<User> {
      protected getEntity(): new () => User {
        return User;
      }

      async findByUsername(username: string): Promise<User | undefined> {
        return this.findOne({ where: { username } });
      }

      async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ where: { email } });
      }
    }
