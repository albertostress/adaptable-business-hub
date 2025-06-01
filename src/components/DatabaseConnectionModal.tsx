
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Database, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = 'http://localhost:4000';

interface DatabaseConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionSuccess: (connection: any) => void;
}

export default function DatabaseConnectionModal({ 
  isOpen, 
  onClose, 
  onConnectionSuccess 
}: DatabaseConnectionModalProps) {
  const [form, setForm] = useState({
    host: '',
    port: 5432,
    user: '',
    password: '',
    database: '',
  });
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const testConnection = async () => {
    setStatus('testing');
    setErrorMessage('');
    
    try {
      const res = await fetch(`${API_BASE}/api/test-db-connection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus('success');
        toast({
          title: "Conexão bem-sucedida!",
          description: "Banco de dados conectado com sucesso.",
        });
        onConnectionSuccess(form);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Falha na conexão');
        toast({
          title: "Erro na conexão",
          description: data.error || 'Falha ao conectar com o banco de dados',
          variant: "destructive",
        });
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Erro de rede ou servidor indisponível');
      toast({
        title: "Erro de conexão",
        description: "Erro de rede ou servidor indisponível",
        variant: "destructive",
      });
    }
  };

  const createTable = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/create-client-table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast({
          title: "Tabela criada!",
          description: "Tabela de clientes criada com sucesso.",
        });
      } else {
        toast({
          title: "Aviso",
          description: data.error || 'Tabela pode já existir',
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar tabela",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await testConnection();
    
    if (status === 'success') {
      await createTable();
      onClose();
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'testing':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Database className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'testing':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={getStatusColor()}>Conectar PostgreSQL</span>
          </DialogTitle>
          <DialogDescription>
            Configure a conexão com seu banco de dados PostgreSQL
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              name="host"
              value={form.host}
              onChange={handleChange}
              placeholder="localhost"
              required
            />
          </div>

          <div>
            <Label htmlFor="port">Porta</Label>
            <Input
              id="port"
              name="port"
              type="number"
              value={form.port}
              onChange={handleChange}
              min={1}
              max={65535}
              required
            />
          </div>

          <div>
            <Label htmlFor="user">Usuário</Label>
            <Input
              id="user"
              name="user"
              value={form.user}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="database">Nome do Banco</Label>
            <Input
              id="database"
              name="database"
              value={form.database}
              onChange={handleChange}
              required
            />
          </div>

          {errorMessage && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={status === 'testing'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {status === 'testing' ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testando...
                </>
              ) : (
                'Conectar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
