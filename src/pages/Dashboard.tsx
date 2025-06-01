
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Target,
  Clock,
  ChevronUp,
  ChevronDown,
  Activity
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalClients: 247,
    monthlySales: 125600,
    conversionRate: 18.5,
    pendingTasks: 12,
    monthlyGrowth: 12.3,
    salesGrowth: 8.7,
    clientGrowth: 15.2
  });

  // Dados para gráficos
  const salesData = [
    { month: 'Jan', vendas: 45000, meta: 50000 },
    { month: 'Fev', vendas: 52000, meta: 55000 },
    { month: 'Mar', vendas: 48000, meta: 50000 },
    { month: 'Abr', vendas: 61000, meta: 60000 },
    { month: 'Mai', vendas: 58000, meta: 65000 },
    { month: 'Jun', vendas: 67000, meta: 70000 },
  ];

  const pipelineData = [
    { stage: 'Leads', value: 150, color: '#3B82F6' },
    { stage: 'Propostas', value: 89, color: '#8B5CF6' },
    { stage: 'Negociação', value: 45, color: '#F59E0B' },
    { stage: 'Fechado', value: 23, color: '#10B981' },
  ];

  const recentActivities = [
    { id: 1, action: 'Nova venda registrada', client: 'João Silva', value: 'R$ 5.200', time: '2 min atrás' },
    { id: 2, action: 'Cliente adicionado', client: 'Maria Santos', value: '', time: '15 min atrás' },
    { id: 3, action: 'Reunião agendada', client: 'Pedro Costa', value: '', time: '1 hora atrás' },
    { id: 4, action: 'Proposta enviada', client: 'Ana Oliveira', value: 'R$ 12.800', time: '2 horas atrás' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {/* Header with greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Executivo
            </h1>
            <p className="text-gray-600">
              Acompanhe o desempenho do seu negócio em tempo real
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalClients}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ChevronUp className="h-3 w-3 mr-1" />
                  +{dashboardData.clientGrowth}% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.monthlySales)}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ChevronUp className="h-3 w-3 mr-1" />
                  +{dashboardData.salesGrowth}% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.conversionRate}%</div>
                <div className="flex items-center text-xs text-green-600">
                  <ChevronUp className="h-3 w-3 mr-1" />
                  +2.3% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.pendingTasks}</div>
                <div className="flex items-center text-xs text-red-600">
                  <ChevronDown className="h-3 w-3 mr-1" />
                  3 tarefas atrasadas
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Vendas</CardTitle>
                <CardDescription>
                  Vendas realizadas vs meta mensal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="vendas" fill="#3B82F6" name="Vendas" />
                    <Bar dataKey="meta" fill="#E5E7EB" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pipeline Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline de Vendas</CardTitle>
                <CardDescription>
                  Distribuição de leads por etapa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pipelineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {pipelineData.map((item) => (
                    <div key={item.stage} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.stage}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Atividades Recentes
                </CardTitle>
                <CardDescription>
                  Últimas movimentações no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.client}</p>
                      </div>
                      <div className="text-right">
                        {activity.value && (
                          <p className="font-medium text-green-600">{activity.value}</p>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Metas do Mês</CardTitle>
                <CardDescription>
                  Progresso das principais métricas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Vendas</span>
                    <span>R$ 67.000 / R$ 70.000</span>
                  </div>
                  <Progress value={95.7} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Novos Clientes</span>
                    <span>23 / 30</span>
                  </div>
                  <Progress value={76.7} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Follow-ups</span>
                    <span>45 / 50</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>

                <Button className="w-full mt-4">
                  Ver Relatório Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
