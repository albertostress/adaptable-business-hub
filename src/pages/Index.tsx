
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Mail, Lock, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: formData.name || 'Usuário Demo',
        email: formData.email,
        company: formData.company || 'Empresa Demo',
        role: 'admin'
      };
      
      localStorage.setItem('gestor_user', JSON.stringify(userData));
      
      toast({
        title: isLogin ? "Login realizado!" : "Conta criada com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Gestor</h1>
              <p className="text-sm text-gray-600 mt-1">CRM Inteligente</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Gerencie clientes, vendas e relatórios em uma plataforma moderna e intuitiva
          </p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-2xl border-none bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {isLogin 
                ? 'Acesse seu dashboard e transforme seus resultados' 
                : 'Comece a revolucionar seu negócio hoje'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        className="pl-10 h-11 border-gray-200 focus:border-blue-500"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">Empresa</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nome da sua empresa"
                        className="pl-10 h-11 border-gray-200 focus:border-blue-500"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10 h-11 border-gray-200 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 border-gray-200 focus:border-blue-500"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  "Processando..."
                ) : (
                  isLogin ? 'Entrar no Gestor' : 'Criar minha conta'
                )}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 mb-2">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              </p>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700 font-semibold h-auto p-0"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Criar conta gratuita' : 'Fazer login'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rodapé */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Gestor. Transformando negócios em resultados.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
