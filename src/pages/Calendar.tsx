
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CalendarIcon, 
  Clock, 
  Plus, 
  MapPin, 
  Users, 
  Bell,
  Video,
  Phone,
  User
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'meeting',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    attendees: ''
  });

  // Mock events data
  const mockEvents = [
    {
      id: '1',
      title: 'Reunião com Cliente TechCorp',
      type: 'meeting',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:30',
      location: 'Sala de Reuniões A',
      attendees: ['João Silva', 'Maria Santos'],
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Follow-up Proposta',
      type: 'task',
      date: new Date(),
      startTime: '14:00',
      endTime: '14:30',
      location: 'Ligação telefônica',
      attendees: ['Pedro Costa'],
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Apresentação de Projeto',
      type: 'appointment',
      date: new Date(Date.now() + 86400000), // Amanhã
      startTime: '10:00',
      endTime: '11:00',
      location: 'Cliente - Escritório Central',
      attendees: ['Ana Lima', 'Carlos Oliveira'],
      color: 'bg-purple-500'
    }
  ];

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'task': return <Bell className="h-4 w-4" />;
      case 'appointment': return <User className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'meeting': return <Badge variant="default">Reunião</Badge>;
      case 'task': return <Badge variant="secondary">Tarefa</Badge>;
      case 'appointment': return <Badge variant="outline">Compromisso</Badge>;
      default: return <Badge>Evento</Badge>;
    }
  };

  const handleCreateEvent = () => {
    console.log('Creating event:', newEvent);
    setIsCreateEventOpen(false);
    setNewEvent({
      title: '',
      type: 'meeting',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      attendees: ''
    });
  };

  const user = JSON.parse(localStorage.getItem('gestor_user') || '{}');
  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Agenda</h1>
              <p className="text-gray-600">Gerencie seus compromissos e reuniões</p>
            </div>
            <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Evento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Criar Novo Evento</DialogTitle>
                  <DialogDescription>
                    Adicione um novo compromisso à sua agenda
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título do Evento</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Reunião com cliente"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Tipo de Evento</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Reunião</SelectItem>
                        <SelectItem value="task">Tarefa</SelectItem>
                        <SelectItem value="appointment">Compromisso</SelectItem>
                        <SelectItem value="reminder">Lembrete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Hora de Início</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">Hora de Término</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Local</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Ex: Escritório, Cliente, Online"
                    />
                  </div>

                  <div>
                    <Label htmlFor="attendees">Participantes</Label>
                    <Input
                      id="attendees"
                      value={newEvent.attendees}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                      placeholder="Ex: João Silva, Maria Santos"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detalhes adicionais do evento"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateEvent}>
                      Criar Evento
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendário */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      {format(selectedDate, "MMMM yyyy", { locale: ptBR })}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant={view === 'month' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setView('month')}
                      >
                        Mês
                      </Button>
                      <Button
                        variant={view === 'week' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setView('week')}
                      >
                        Semana
                      </Button>
                      <Button
                        variant={view === 'day' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setView('day')}
                      >
                        Dia
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    className="rounded-md border pointer-events-auto"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Eventos do Dia */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Eventos de {format(selectedDate, "dd/MM", { locale: ptBR })}
                  </CardTitle>
                  <CardDescription>
                    {todayEvents.length} evento(s) agendado(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayEvents.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum evento agendado para este dia</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setIsCreateEventOpen(true)}
                        >
                          Criar Evento
                        </Button>
                      </div>
                    ) : (
                      todayEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getEventTypeIcon(event.type)}
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                            </div>
                            {getEventTypeBadge(event.type)}
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{event.startTime} - {event.endTime}</span>
                            </div>
                            
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            
                            {event.attendees.length > 0 && (
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                <span>{event.attendees.join(', ')}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Video className="h-3 w-3 mr-1" />
                              Meet
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-3 w-3 mr-1" />
                              Ligar
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Eventos */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                  <CardDescription>Agenda dos próximos dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            {format(event.date, "dd/MM")} às {event.startTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
