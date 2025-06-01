
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, TrendingUp, Target, Filter } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import SaleForm from "@/components/SaleForm";

interface Sale {
  id: string;
  clientName: string;
  value: number;
  status: 'Proposta' | 'Negociação' | 'Fechado' | 'Perdido';
  product: string;
  date: string;
  salesPerson: string;
  probability: number;
  notes: string;
}

const Sales = () => {
  const [user, setUser] = useState<any>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [draggedSale, setDraggedSale] = useState<Sale | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('gestor_user');
    if (!userData) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(userData));

    // Load sample sales
    const sampleSales: Sale[] = [
      {
        id: '1',
        clientName: 'Maria Silva',
        value: 15000,
        status: 'Negociação',
        product: 'Consultoria Jurídica',
        date: '2024-02-01',
        salesPerson: 'João Vendedor',
        probability: 70,
        notes: 'Cliente interessado, aguardando aprovação interna'
      },
      {
        id: '2',
        clientName: 'TechCorp',
        value: 25000,
        status: 'Proposta',
        product: 'Sistema CRM',
        date: '2024-01-28',
        salesPerson: 'Ana Vendedora',
        probability: 40,
        notes: 'Primeira reunião realizada, proposta enviada'
      },
      {
        id: '3',
        clientName: 'StartupCo',
        value: 8000,
        status: 'Fechado',
        product: 'Marketing Digital',
        date: '2024-01-25',
        salesPerson: 'Carlos Vendedor',
        probability: 100,
        notes: 'Venda concluída com sucesso'
      }
    ];
    setSales(sampleSales);
  }, [navigate]);

  if (!user) return null;

  const statusColumns = [
    { status: 'Proposta', color: 'bg-blue-50 border-blue-200' },
    { status: 'Negociação', color: 'bg-yellow-50 border-yellow-200' },
    { status: 'Fechado', color: 'bg-green-50 border-green-200' },
    { status: 'Perdido', color: 'bg-red-50 border-red-200' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Proposta': return 'bg-blue-100 text-blue-800';
      case 'Negociação': return 'bg-yellow-100 text-yellow-800';
      case 'Fechado': return 'bg-green-100 text-green-800';
      case 'Perdido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddSale = (saleData: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString()
    };
    setSales(prev => [...prev, newSale]);
    setShowForm(false);
  };

  const handleEditSale = (saleData: Omit<Sale, 'id'>) => {
    if (!editingSale) return;
    
    const updatedSale: Sale = {
      ...saleData,
      id: editingSale.id
    };
    
    setSales(prev => prev.map(sale => 
      sale.id === editingSale.id ? updatedSale : sale
    ));
    setEditingSale(null);
    setShowForm(false);
  };

  const handleDragStart = (sale: Sale) => {
    setDraggedSale(sale);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: string) => {
    if (!draggedSale) return;
    
    setSales(prev => prev.map(sale => 
      sale.id === draggedSale.id 
        ? { ...sale, status: status as Sale['status'] }
        : sale
    ));
    setDraggedSale(null);
  };

  const totalValue = sales.reduce((sum, sale) => sum + sale.value, 0);
  const closedValue = sales.filter(sale => sale.status === 'Fechado').reduce((sum, sale) => sum + sale.value, 0);
  const conversionRate = sales.length > 0 ? (sales.filter(sale => sale.status === 'Fechado').length / sales.length * 100) : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
                <p className="text-gray-600">Gerencie seu pipeline de vendas</p>
              </div>
              <Button 
                onClick={() => {
                  setEditingSale(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Venda
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      R$ {totalValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Valor Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {closedValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Vendas Fechadas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {conversionRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Taxa Conversão</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Filter className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{sales.length}</div>
                    <div className="text-sm text-gray-600">Total Oportunidades</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statusColumns.map((column) => (
              <div
                key={column.status}
                className={`${column.color} border-2 border-dashed rounded-lg p-4`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.status)}
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-center">
                  {column.status}
                  <span className="ml-2 text-sm text-gray-600">
                    ({sales.filter(sale => sale.status === column.status).length})
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {sales
                    .filter(sale => sale.status === column.status)
                    .map((sale) => (
                      <Card
                        key={sale.id}
                        className="cursor-move hover:shadow-lg transition-shadow bg-white"
                        draggable
                        onDragStart={() => handleDragStart(sale)}
                        onClick={() => {
                          setEditingSale(sale);
                          setShowForm(true);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="mb-2">
                            <h4 className="font-medium text-gray-900 truncate">
                              {sale.clientName}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {sale.product}
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <div className="text-lg font-bold text-green-600">
                              R$ {sale.value.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {sale.salesPerson}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(sale.status)} variant="outline">
                              {sale.probability}%
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(sale.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>

                          {sale.notes && (
                            <p className="text-xs text-gray-600 mt-2 truncate">
                              {sale.notes}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
                
                {sales.filter(sale => sale.status === column.status).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-sm">Nenhuma venda</p>
                    <p className="text-xs">Arraste vendas para cá</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Sale Form Modal */}
      {showForm && (
        <SaleForm
          sale={editingSale}
          onSave={editingSale ? handleEditSale : handleAddSale}
          onCancel={() => {
            setShowForm(false);
            setEditingSale(null);
          }}
        />
      )}
    </div>
  );
};

export default Sales;
