
import { ReactNode } from 'react';
import { usePermissions, PermissionLevel } from '@/hooks/usePermissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  resource: keyof ReturnType<typeof usePermissions>['user']['role']['permissions'];
  level?: PermissionLevel;
  fallback?: ReactNode;
}

const ProtectedRoute = ({ 
  children, 
  resource, 
  level = 'read', 
  fallback 
}: ProtectedRouteProps) => {
  const { hasPermission, user } = usePermissions();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>
              Você precisa estar logado para acessar esta página
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!hasPermission(resource, level)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Você não tem permissão para acessar esta funcionalidade.
              Entre em contato com o administrador se precisar de acesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-sm text-gray-500">
              <p>Recurso: <strong>{resource}</strong></p>
              <p>Nível necessário: <strong>{level}</strong></p>
              <p>Sua função: <strong>{user.role.name}</strong></p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
