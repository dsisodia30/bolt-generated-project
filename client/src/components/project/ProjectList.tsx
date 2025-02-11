import { Entity } from 'typeorm'
    import { Role } from '../entities/Role'
    import { BaseRepository } from './BaseRepository'

    export class RoleRepository extends BaseRepository<Role> {
      protected getEntity(): new () => Role {
        return Role;
      }

      async assignPermission(roleId: number, permissionId: number): Promise<Role> {
        const role = await this.findOne(roleId, { relations: ['permissions'] });
        const permission = await new PermissionRepository().findOne(permissionId);
        
        if (!role || !permission) throw new Error('Role or permission not found');
        
        role.permissions.push(permission);
        return this.repository.save(role);
      }
    }
