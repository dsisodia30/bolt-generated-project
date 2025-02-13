import { Entity } from 'typeorm'
    import { Permission } from '../entities/Permission'
    import { BaseRepository } from './BaseRepository'

    export class PermissionRepository extends BaseRepository<Permission> {
      protected getEntity(): new () => Permission {
        return Permission;
      }
    }
