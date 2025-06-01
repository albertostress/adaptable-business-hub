
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  CalendarIcon, 
  Download, 
  Filter,
  Users,
  DollarSign,
  Target,
  Award
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("vendas");
  const [groupBy, setGroupBy] = useState("mes");

  // Mock data for demonstration
  const mockMetrics = {
    totalSales: 125400,
    totalClients: 234,
    conversionRate: 23.5,
    avgTicket: 1850,
    salesGrowth: 12.3,
    clientsGrowth: 8.7
  };

  const mockFunnelData = [
    { stage: "Leads", count: 450, percentage: 100, color: "bg-blue-500" },
    { stage: "Proposta", count: 180, percentage: 40, color: "bg-yellow-500" },
    { stage: "Negociação", count: 90, percentage: 20, color: "bg-orange-500" },
    { stage: "Fechado", count: 45, percentage: 10, color: "bg-green-500" }
  ];

  const mockTopProducts = [
    { name: "Consultoria Empresarial", revenue: 45600, percentage: 36 },
    { name: "Auditoria Fiscal", revenue: 32100, percentage: 26 },
    { name: "Planejamento Tributário", revenue: 28900, percentage: 23 },
    { name: "Contabilidade Digital", revenue: 18800, percentage: 15 }
  ];

  const mockTopClients = [
    { name: "TechCorp Ltda", revenue: 15600 },
    { name: "Indústria Brasil SA", revenue: 12400 },
    { name: "Comercial Santos", revenue: 9800 },
    { name: "Startup Inovação", revenue: 7200 }
  ];

  const user = JSON.parse(localStorage.getItem('gestor_user') || '{}');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
            <p className="text-gray-600">Análise detalhada do desempenho do seu negócio</p>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros de Análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Período</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          "Selecionar data"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, from: date || new Date() }))}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de Relatório</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="clientes">Clientes</SelectItem>
                      <SelectItem value="produtos">Produtos</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Agrupar por</label>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dia">Dia</SelectItem>
                      <SelectItem value="semana">Semana</SelectItem>
                      <SelectItem value="mes">Mês</SelectItem>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendas Totais</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockMetrics.totalSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{mockMetrics.salesGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                    <p className="text-3xl font-bold text-gray-900">{mockMetrics.totalClients}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{mockMetrics.clientsGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-3xl font-bold text-gray-900">{mockMetrics.conversionRate}%</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+2.1%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockMetrics.avgTicket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600 font-medium">-1.2%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Funil de Vendas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Funil de Vendas
                </CardTitle>
                <CardDescription>
                  Visualização do pipeline completo de vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFunnelData.map((item, index) => (
                    <div key={item.stage} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                        <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Produtos */}
            <Card>
              <CardHeader>
                <CardTitle>Top Produtos/Serviços</CardTitle>
                <CardDescription>
                  Produtos com maior faturamento no período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.percentage}% do total</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {product.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Clientes */}
          <Card>
            <CardHeader>
              <CardTitle>Top Clientes por Faturamento</CardTitle>
              <CardDescription>
                Principais clientes que mais contribuem para o faturamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockTopClients.map((client, index) => (
                  <div key={client.name} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <span className="font-medium text-gray-900">{client.name}</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      {client.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
