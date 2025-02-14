import { Entity, FindOneOptions, FindOptionsWhere } from 'typeorm'
    import { User } from '../entities/User'
    import { BaseRepository } from './BaseRepository'

    export class UserRepository extends BaseRepository<User> {
      protected getEntity(): new () => User {
        return User;
      }

      async findByUsername(username: string): Promise<User | null> {
        return await this.repository.findOneBy({ username } as FindOptionsWhere<User>);
      }

      async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email } as FindOptionsWhere<User>);
      }
    }
