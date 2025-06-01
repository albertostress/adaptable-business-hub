
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('gestor_user');
    if (!userData) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  const stats = [
    {
      title: "Total de Clientes",
      value: "127",
      change: "+12%",
      changeType: "positive",
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Vendas do Mês",
      value: "R$ 45.230",
      change: "+8%",
      changeType: "positive",
      icon: <DollarSign className="h-6 w-6 text-green-600" />
    },
    {
      title: "Taxa de Conversão",
      value: "23.5%",
      change: "+3%",
      changeType: "positive",
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Agendamentos Hoje",
      value: "8",
      change: "2 pendentes",
      changeType: "neutral",
      icon: <Calendar className="h-6 w-6 text-orange-600" />
    }
  ];

  const recentActivities = [
    { type: "Novo Cliente", description: "Maria Silva cadastrada", time: "2h atrás" },
    { type: "Venda Fechada", description: "R$ 2.500 - João Santos", time: "4h atrás" },
    { type: "Reunião", description: "Apresentação proposta - TechCorp", time: "6h atrás" },
    { type: "Follow-up", description: "Contato com 5 leads", time: "1 dia atrás" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {user.name}! 👋
            </h1>
            <p className="text-gray-600">
              Aqui está um resumo do seu negócio hoje.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>
                  Acesso rápido às funcionalidades principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/clients')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/sales')}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Registrar Venda
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Reunião
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>
                  Últimas movimentações do seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.type}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
