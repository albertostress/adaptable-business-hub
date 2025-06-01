import React, { useState } from 'react';

const API_BASE = 'http://localhost:4000';

interface ConnectionProps {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface ClientCreateFormProps {
  connection: ConnectionProps;
  onClientAdded: () => void;
}

export default function ClientCreateForm({ connection, onClientAdded }: ClientCreateFormProps) {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClient = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${API_BASE}/api/add-client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          telefone: form.telefone,
          email: form.email,
          ...connection,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setForm({ nome: '', telefone: '', email: '' });
        onClientAdded();
      } else {
        setError(data.error || 'Erro ao adicionar cliente');
      }
    } catch (err: any) {
      setError('Erro de rede ou inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAddClient();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>Adicionar Novo Cliente</h3>
      <label>
        Nome
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Telefone
        <input
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
        {loading ? 'Adicionando...' : 'Adicionar Cliente'}
      </button>
      {success && <div style={{ color: 'green' }}>Cliente adicionado com sucesso!</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
} 