import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  value: string;
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    axios.get<Role[]>('http://localhost:5000/api/roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error('Error fetching roles:', error));
    
    axios.get<Permission[]>('http://localhost:5000/api/permissions')
      .then(response => setPermissions(response.data))
      .catch(error => console.error('Error fetching permissions:', error));
  }, []);

  const handleAssignPermission = (roleId: number, permissionId: number) => {
    axios.post(`http://localhost:5000/api/roles/${roleId}/assign-permission/${permissionId}`)
      .then(response => console.log('Permission assigned:', response.data))
      .catch(error => console.error('Error assigning permission:', error));
  }

  return (
    <div>
      <h1>Role Management</h1>
      <div className="role-management">
        <div className="roles-list">
          <h2>Roles</h2>
          <ul>
            {roles.map((role: Role) => (
              <li key={role.id}>
                <span>{role.name}</span>
                <div className="permissions">
                  {role.permissions.map((permission: Permission) => (
                    <div key={permission.id}>
                      <span>{permission.value}</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="permissions-list">
          <h2>Permissions</h2>
          <ul>
            {permissions.map((permission: Permission) => (
              <li key={permission.id}>
                <span>{permission.value}</span>
                <button 
                  onClick={() => handleAssignPermission(1, permission.id)}
                >
                  Assign
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
