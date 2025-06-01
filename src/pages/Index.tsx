
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Calendar, ArrowRight, BarChart3, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem('gestor_user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Gestão de Clientes",
      description: "Centralize todos os dados dos seus clientes em um só lugar"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Pipeline de Vendas",
      description: "Acompanhe suas oportunidades do primeiro contato ao fechamento"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Relatórios Inteligentes",
      description: "Dashboards com insights para impulsionar seu crescimento"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de ponta"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Automações",
      description: "Automatize tarefas repetitivas e foque no que importa"
    },
    {
      icon: <Calendar className="h-8 w-8 text-indigo-600" />,
      title: "Agenda Integrada",
      description: "Gerencie compromissos e nunca perca uma oportunidade"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Gestor</h1>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            O CRM que <span className="text-blue-600">cresce</span> com seu negócio
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Seja para clínicas, consultorias ou comércios, o Gestor se adapta ao seu tipo de negócio.
            Gerencie clientes, vendas e relatórios em uma plataforma intuitiva e poderosa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/auth')}
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Ver Demonstração
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600">Empresas Confiam</div>
            </CardContent>
          </Card>
          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-gray-600">Aumento em Vendas</div>
            </CardContent>
          </Card>
          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Suporte Disponível</div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tudo que você precisa em um só lugar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none shadow-2xl">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para revolucionar seu negócio?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já transformaram seus resultados com o Gestor.
              Comece hoje mesmo, sem compromisso.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/auth')}
            >
              Começar Agora - É Grátis!
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
