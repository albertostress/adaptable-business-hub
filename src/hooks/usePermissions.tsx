
import { useMemo } from 'react';

export type PermissionLevel = 'none' | 'read' | 'write' | 'full';

export interface Role {
  name: 'admin' | 'editor' | 'viewer' | 'custom';
  permissions: {
    dashboard: PermissionLevel;
    clients: PermissionLevel;
    sales: PermissionLevel;
    reports: PermissionLevel;
    calendar: PermissionLevel;
    settings: PermissionLevel;
    webhooks: PermissionLevel;
    users: PermissionLevel;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}

const defaultRoles: Record<string, Role> = {
  admin: {
    name: 'admin',
    permissions: {
      dashboard: 'full',
      clients: 'full',
      sales: 'full',
      reports: 'full',
      calendar: 'full',
      settings: 'full',
      webhooks: 'full',
      users: 'full',
    }
  },
  editor: {
    name: 'editor',
    permissions: {
      dashboard: 'read',
      clients: 'write',
      sales: 'write',
      reports: 'read',
      calendar: 'write',
      settings: 'read',
      webhooks: 'none',
      users: 'none',
    }
  },
  viewer: {
    name: 'viewer',
    permissions: {
      dashboard: 'read',
      clients: 'read',
      sales: 'read',
      reports: 'read',
      calendar: 'read',
      settings: 'none',
      webhooks: 'none',
      users: 'none',
    }
  }
};

export const usePermissions = () => {
  const user = useMemo(() => {
    const userData = localStorage.getItem('gestor_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add role permissions if not present
      if (!parsedUser.role || !parsedUser.role.permissions) {
        parsedUser.role = defaultRoles.admin; // Default to admin for demo
      }
      return parsedUser as User;
    }
    return null;
  }, []);

  const hasPermission = (resource: keyof Role['permissions'], level: PermissionLevel): boolean => {
    if (!user || !user.role) return false;
    
    const userPermission = user.role.permissions[resource];
    
    switch (level) {
      case 'none':
        return true;
      case 'read':
        return ['read', 'write', 'full'].includes(userPermission);
      case 'write':
        return ['write', 'full'].includes(userPermission);
      case 'full':
        return userPermission === 'full';
      default:
        return false;
    }
  };

  const canAccess = (resource: keyof Role['permissions']): boolean => {
    return hasPermission(resource, 'read');
  };

  const canEdit = (resource: keyof Role['permissions']): boolean => {
    return hasPermission(resource, 'write');
  };

  const canManage = (resource: keyof Role['permissions']): boolean => {
    return hasPermission(resource, 'full');
  };

  return {
    user,
    hasPermission,
    canAccess,
    canEdit,
    canManage,
    isAdmin: user?.role?.name === 'admin',
    isEditor: user?.role?.name === 'editor',
    isViewer: user?.role?.name === 'viewer'
  };
};
