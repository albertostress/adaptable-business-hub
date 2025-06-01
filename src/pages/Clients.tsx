
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Mail, Phone, MapPin, Edit, Trash2, Users, Database } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import ClientForm from "@/components/ClientForm";
import { useDatabaseConnection } from "@/hooks/useDatabaseConnection";
import { useToast } from "@/hooks/use-toast";

const API_BASE = 'http://localhost:4000';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  status: 'Ativo' | 'Inativo' | 'Lead';
  tags: string[];
  value: number;
  lastContact: string;
}

const Clients = () => {
  const [user, setUser] = useState<any>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [loadingClients, setLoadingClients] = useState(false);
  const navigate = useNavigate();
  const { status: dbStatus } = useDatabaseConnection();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('gestor_user');
    if (!userData) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(userData));

    // Carregar clientes do PostgreSQL se conectado, senão usar dados de exemplo
    if (dbStatus.connected && dbStatus.connection) {
      loadClientsFromDatabase();
    } else {
      loadSampleClients();
    }
  }, [navigate, dbStatus.connected]);

  const loadClientsFromDatabase = async () => {
    if (!dbStatus.connection) return;
    
    setLoadingClients(true);
    try {
      const response = await fetch(`${API_BASE}/api/get-clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbStatus.connection),
      });

      const data = await response.json();
      if (data.success) {
        // Converter dados do PostgreSQL para o formato da interface
        const dbClients: Client[] = data.clientes.map((cliente: any) => ({
          id: cliente.id.toString(),
          name: cliente.nome,
          email: cliente.email,
          phone: cliente.telefone,
          company: cliente.empresa || '',
          address: cliente.endereco || '',
          status: cliente.status || 'Lead',
          tags: cliente.tags ? cliente.tags.split(',').map((tag: string) => tag.trim()) : [],
          value: cliente.valor || 0,
          lastContact: cliente.ultimo_contato || new Date().toISOString().split('T')[0]
        }));
        setClients(dbClients);
      } else {
        toast({
          title: "Erro ao carregar clientes",
          description: data.error || "Erro ao buscar clientes do banco de dados",
          variant: "destructive",
        });
        loadSampleClients();
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao banco de dados",
        variant: "destructive",
      });
      loadSampleClients();
    } finally {
      setLoadingClients(false);
    }
  };

  const loadSampleClients = () => {
    // Dados de exemplo quando não há conexão com o banco
    const sampleClients: Client[] = [
      {
        id: '1',
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '(11) 99999-9999',
        company: 'Silva & Associados',
        address: 'São Paulo, SP',
        status: 'Ativo',
        tags: ['Premium', 'Advocacia'],
        value: 15000,
        lastContact: '2024-01-15'
      },
      {
        id: '2',
        name: 'João Santos',
        email: 'joao@techcorp.com',
        phone: '(11) 88888-8888',
        company: 'TechCorp',
        address: 'Rio de Janeiro, RJ',
        status: 'Ativo',
        tags: ['Tecnologia', 'B2B'],
        value: 25000,
        lastContact: '2024-01-14'
      },
      {
        id: '3',
        name: 'Ana Costa',
        email: 'ana@startup.io',
        phone: '(11) 77777-7777',
        company: 'StartupCo',
        address: 'Belo Horizonte, MG',
        status: 'Lead',
        tags: ['Startup', 'SaaS'],
        value: 0,
        lastContact: '2024-01-10'
      }
    ];
    setClients(sampleClients);
  };

  if (!user) return null;

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = async (clientData: Omit<Client, 'id'>) => {
    if (dbStatus.connected && dbStatus.connection) {
      // Adicionar ao PostgreSQL
      try {
        const response = await fetch(`${API_BASE}/api/add-client`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...dbStatus.connection,
            nome: clientData.name,
            email: clientData.email,
            telefone: clientData.phone,
            empresa: clientData.company,
            endereco: clientData.address,
            status: clientData.status,
            valor: clientData.value,
            tags: clientData.tags.join(', '),
            ultimo_contato: clientData.lastContact
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast({
            title: "Cliente adicionado!",
            description: "Cliente salvo no banco de dados PostgreSQL",
          });
          // Recarregar lista de clientes
          loadClientsFromDatabase();
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        toast({
          title: "Erro ao adicionar cliente",
          description: "Erro ao salvar no banco de dados",
          variant: "destructive",
        });
        return;
      }
    } else {
      // Adicionar localmente (modo de exemplo)
      const newClient: Client = {
        ...clientData,
        id: Date.now().toString()
      };
      setClients(prev => [...prev, newClient]);
      toast({
        title: "Cliente adicionado!",
        description: "Cliente adicionado localmente (conecte ao PostgreSQL para persistir dados)",
      });
    }
    setShowForm(false);
  };

  const handleEditClient = (clientData: Omit<Client, 'id'>) => {
    if (!editingClient) return;
    
    const updatedClient: Client = {
      ...clientData,
      id: editingClient.id
    };
    
    setClients(prev => prev.map(client => 
      client.id === editingClient.id ? updatedClient : client
    ));
    setEditingClient(null);
    setShowForm(false);
    
    toast({
      title: "Cliente atualizado!",
      description: "Informações do cliente foram atualizadas",
    });
  };

  const handleDeleteClient = async (clientId: string) => {
    if (dbStatus.connected && dbStatus.connection) {
      try {
        const response = await fetch(`${API_BASE}/api/delete-client`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...dbStatus.connection,
            id: parseInt(clientId)
          }),
        });

        const data = await response.json();
        if (data.success) {
          setClients(prev => prev.filter(client => client.id !== clientId));
          toast({
            title: "Cliente removido!",
            description: "Cliente removido do banco de dados",
          });
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Erro ao remover cliente:', error);
        toast({
          title: "Erro ao remover cliente",
          description: "Erro ao remover do banco de dados",
          variant: "destructive",
        });
      }
    } else {
      setClients(prev => prev.filter(client => client.id !== clientId));
      toast({
        title: "Cliente removido!",
        description: "Cliente removido localmente",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-gray-100 text-gray-800';
      case 'Lead': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Clientes
                  {dbStatus.connected && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Database className="h-3 w-3 mr-1" />
                      PostgreSQL
                    </Badge>
                  )}
                </h1>
                <p className="text-gray-600">
                  {dbStatus.connected 
                    ? 'Gerencie sua base de clientes conectada ao PostgreSQL' 
                    : 'Gerencie sua base de clientes (conecte ao PostgreSQL nas Configurações)'}
                </p>
              </div>
              <Button 
                onClick={() => {
                  setEditingClient(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              {!dbStatus.connected && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/settings')}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Conectar PostgreSQL
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{clients.length}</div>
                <div className="text-sm text-gray-600">Total de Clientes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {clients.filter(c => c.status === 'Ativo').length}
                </div>
                <div className="text-sm text-gray-600">Clientes Ativos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {clients.filter(c => c.status === 'Lead').length}
                </div>
                <div className="text-sm text-gray-600">Leads</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  R$ {clients.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Valor Total</div>
              </CardContent>
            </Card>
          </div>

          {loadingClients ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex items-center justify-center">
                  <Database className="h-8 w-8 text-blue-500 animate-pulse mr-2" />
                  <span>Carregando clientes do PostgreSQL...</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Clients Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                  <Card key={client.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                      {client.company && (
                        <CardDescription>{client.company}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {client.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {client.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {client.address}
                        </div>
                      </div>

                      {client.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {client.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-sm">
                          <span className="font-medium">Valor: </span>
                          <span className="text-green-600">
                            R$ {client.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingClient(client);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredClients.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum cliente encontrado
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ? 'Tente um termo de busca diferente' : 'Comece adicionando seu primeiro cliente'}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Cliente
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </main>
      </div>

      {/* Client Form Modal */}
      {showForm && (
        <ClientForm
          client={editingClient}
          onSave={editingClient ? handleEditClient : handleAddClient}
          onCancel={() => {
            setShowForm(false);
            setEditingClient(null);
          }}
        />
      )}
    </div>
  );
};

export default Clients;
