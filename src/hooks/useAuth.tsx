
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  role: {
    name: 'admin' | 'editor' | 'viewer';
    permissions: {
      dashboard: 'none' | 'read' | 'write' | 'full';
      clients: 'none' | 'read' | 'write' | 'full';
      sales: 'none' | 'read' | 'write' | 'full';
      reports: 'none' | 'read' | 'write' | 'full';
      calendar: 'none' | 'read' | 'write' | 'full';
      settings: 'none' | 'read' | 'write' | 'full';
      webhooks: 'none' | 'read' | 'write' | 'full';
      users: 'none' | 'read' | 'write' | 'full';
    };
  };
  avatar?: string;
  active: boolean;
  lastLogin?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('gestor_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('gestor_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const mockUser: User = {
        id: '1',
        name: 'Administrador',
        email: email,
        role: {
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
        active: true,
        lastLogin: new Date().toISOString(),
        createdAt: '2024-01-01T00:00:00Z'
      };

      setUser(mockUser);
      localStorage.setItem('gestor_user', JSON.stringify(mockUser));
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${mockUser.name}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: {
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
        active: true,
        createdAt: new Date().toISOString()
      };

      setUser(newUser);
      localStorage.setItem('gestor_user', JSON.stringify(newUser));
      
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${newUser.name}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar a conta",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gestor_user');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
