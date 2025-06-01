import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Webhook, 
  Users, 
  Palette, 
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Globe,
  Lock,
  Mail,
  Database as DatabaseIcon,
  CheckCircle,
  XCircle,
  Key
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import DatabaseConnectionModal from '@/components/DatabaseConnectionModal';
import { useDatabaseConnection } from '@/hooks/useDatabaseConnection';
import UserManagement from '@/components/UserManagement';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("integrations");
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [isWebhookOpen, setIsWebhookOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'viewer' });
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });
  const { toast } = useToast();
  const { status: dbStatus, saveConnection, clearConnection } = useDatabaseConnection();

  // Mock data
  const mockUsers = [
    { id: '1', name: 'João Silva', email: 'joao@empresa.com', role: 'admin', active: true, lastLogin: '2024-01-15' },
    { id: '2', name: 'Maria Santos', email: 'maria@empresa.com', role: 'editor', active: true, lastLogin: '2024-01-14' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@empresa.com', role: 'viewer', active: false, lastLogin: '2024-01-10' }
  ];

  const mockWebhooks = [
    { id: '1', name: 'N8N Integration', url: 'https://webhook.n8n.io/abc123', events: ['sale.created', 'client.created'], active: true },
    { id: '2', name: 'Zapier Automation', url: 'https://hooks.zapier.com/xyz789', events: ['sale.completed'], active: true },
    { id: '3', name: 'Slack Notifications', url: 'https://hooks.slack.com/def456', events: ['daily.summary'], active: false }
  ];

  const roleLabels = {
    admin: 'Administrador',
    editor: 'Editor',
    viewer: 'Visualizador'
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    editor: 'bg-blue-100 text-blue-800',
    viewer: 'bg-gray-100 text-gray-800'
  };

  const handleInviteUser = () => {
    console.log('Inviting user:', newUser);
    toast({
      title: "Convite enviado",
      description: `Convite enviado para ${newUser.email}`,
    });
    setIsInviteUserOpen(false);
    setNewUser({ name: '', email: '', role: 'viewer' });
  };

  const handleCreateWebhook = () => {
    console.log('Creating webhook:', newWebhook);
    toast({
      title: "Webhook criado",
      description: "Webhook configurado com sucesso",
    });
    setIsWebhookOpen(false);
    setNewWebhook({ name: '', url: '', events: [] });
  };

  const handleDbConnectionSuccess = (connection: any) => {
    saveConnection(connection, 'success');
    toast({
      title: "Banco de dados conectado!",
      description: "Agora você pode adicionar clientes diretamente no PostgreSQL",
    });
  };

  const user = JSON.parse(localStorage.getItem('gestor_user') || '{}');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
            <p className="text-gray-600">Gerencie integrações, usuários e personalizações</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Webhook className="h-4 w-4" />
                Integrações
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Personalização
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Faturamento
              </TabsTrigger>
            </TabsList>

            {/* Aba Integrações */}
            <TabsContent value="integrations" className="space-y-6">
              {/* Seção PostgreSQL */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DatabaseIcon className="h-5 w-5" />
                    Banco de Dados PostgreSQL
                    {dbStatus.connected && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {dbStatus.error && <XCircle className="h-5 w-5 text-red-500" />}
                  </CardTitle>
                  <CardDescription>
                    Configure a conexão com PostgreSQL para armazenar dados dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dbStatus.connected ? (
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div>
                          <h4 className="font-medium text-green-900">Conectado ao PostgreSQL</h4>
                          <p className="text-sm text-green-700">
                            {dbStatus.connection?.host}:{dbStatus.connection?.port}/{dbStatus.connection?.database}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsDbModalOpen(true)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={clearConnection}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Desconectar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <DatabaseIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 mb-4">
                        {dbStatus.error ? 'Erro na conexão com o banco de dados' : 'Nenhuma conexão configurada'}
                      </p>
                      {dbStatus.error && (
                        <p className="text-sm text-red-600 mb-4">{dbStatus.error}</p>
                      )}
                      <Button onClick={() => setIsDbModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Conectar PostgreSQL
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Seção Webhooks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Webhook className="h-5 w-5" />
                        Webhooks e APIs
                      </CardTitle>
                      <CardDescription>
                        Configure webhooks para integrar com sistemas externos
                      </CardDescription>
                    </div>
                    <Dialog open={isWebhookOpen} onOpenChange={setIsWebhookOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Webhook
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Criar Webhook</DialogTitle>
                          <DialogDescription>
                            Configure um novo webhook para receber eventos
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="webhook-name">Nome</Label>
                            <Input
                              id="webhook-name"
                              value={newWebhook.name}
                              onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Ex: N8N Integration"
                            />
                          </div>
                          <div>
                            <Label htmlFor="webhook-url">URL do Webhook</Label>
                            <Input
                              id="webhook-url"
                              value={newWebhook.url}
                              onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                              placeholder="https://webhook.site/abc123"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsWebhookOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleCreateWebhook}>
                              Criar Webhook
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockWebhooks.map((webhook) => (
                      <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${webhook.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <div>
                            <h4 className="font-medium">{webhook.name}</h4>
                            <p className="text-sm text-gray-500">{webhook.url}</p>
                            <div className="flex gap-1 mt-1">
                              {webhook.events.map((event) => (
                                <Badge key={event} variant="secondary" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={webhook.active} />
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Usuários */}
            <TabsContent value="users" className="space-y-6">
              <UserManagement />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Matriz de Permissões
                  </CardTitle>
                  <CardDescription>
                    Configure permissões detalhadas por função
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['admin', 'editor', 'viewer'].map((role) => (
                      <Card key={role} className="p-4">
                        <h4 className="font-medium mb-3 capitalize">{role}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Dashboard</span>
                            <span className="text-green-600">{role === 'admin' ? 'Full' : 'Read'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Clientes</span>
                            <span className="text-green-600">{role === 'viewer' ? 'Read' : 'Write'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vendas</span>
                            <span className="text-green-600">{role === 'viewer' ? 'Read' : 'Write'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Relatórios</span>
                            <span className="text-green-600">Read</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Configurações</span>
                            <span className="text-red-600">{role === 'admin' ? 'Full' : 'None'}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Personalização */}
            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Identidade Visual
                  </CardTitle>
                  <CardDescription>
                    Personalize a aparência do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" placeholder="Sua Empresa Ltda" />
                  </div>
                  
                  <div>
                    <Label htmlFor="logo">Logo da Empresa</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Globe className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">Clique para fazer upload do logo</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Cor Primária</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-10 h-10 bg-blue-600 rounded border"></div>
                        <Input id="primary-color" value="#0066CC" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Cor Secundária</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-10 h-10 bg-gray-600 rounded border"></div>
                        <Input id="secondary-color" value="#6B7280" />
                      </div>
                    </div>
                  </div>

                  <Button>Salvar Alterações</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Módulos do Sistema</CardTitle>
                  <CardDescription>
                    Ative ou desative funcionalidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Dashboard Analítico', enabled: true },
                    { name: 'Gestão de Clientes', enabled: true },
                    { name: 'Pipeline de Vendas', enabled: true },
                    { name: 'Relatórios Avançados', enabled: true },
                    { name: 'Agenda e Calendário', enabled: false },
                    { name: 'Integração WhatsApp', enabled: false }
                  ].map((module) => (
                    <div key={module.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{module.name}</span>
                      <Switch checked={module.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Faturamento */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Plano Atual
                  </CardTitle>
                  <CardDescription>
                    Gerencie sua assinatura e uso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 border rounded-lg bg-blue-50">
                      <h3 className="text-lg font-bold text-blue-900">Plano Pro</h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">R$ 99/mês</p>
                      <Badge className="mt-2">Ativo</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Usuários</span>
                          <span>3/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Clientes</span>
                          <span>234/1000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Armazenamento</span>
                          <span>2.1GB/10GB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '21%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">Próxima cobrança</p>
                      <p className="text-lg font-bold">15 de Fevereiro</p>
                      <Button variant="outline" className="mt-4 w-full">
                        Gerenciar Assinatura
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Faturas</CardTitle>
                  <CardDescription>
                    Visualize suas faturas anteriores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma fatura disponível</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Modal de Conexão de Banco de Dados */}
      <DatabaseConnectionModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        onConnectionSuccess={handleDbConnectionSuccess}
      />
    </div>
  );
};

export default Settings;
