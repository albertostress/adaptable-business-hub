import React, { useState } from 'react';

const API_BASE = 'http://localhost:4000';

const STATUS_COLORS = {
  success: 'green',
  error: 'red',
  pending: 'gray',
};

const STATUS_ICONS = {
  success: '✅',
  error: '❌',
  pending: '⏳',
};

interface DatabaseProps {
  onSave?: (connection: any, status: 'success' | 'error' | 'pending') => void;
}

export default function Database({ onSave }: DatabaseProps) {
  const [form, setForm] = useState({
    host: '',
    port: 5432,
    user: '',
    password: '',
    database: '',
  });
  const [status, setStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('pending');
    setNotification(null);
    try {
      const res = await fetch(`${API_BASE}/api/test-db-connection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setNotification('Conexão bem-sucedida!');
        if (onSave) onSave(form, 'success');
      } else {
        setStatus('error');
        setNotification('Falha ao conectar à base de dados.');
        if (onSave) onSave(form, 'error');
      }
    } catch (err) {
      setStatus('error');
      setNotification('Erro de rede ou inesperado.');
      if (onSave) onSave(form, 'error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{STATUS_ICONS[status]}</span>
        <span style={{ color: STATUS_COLORS[status] }}>Configuração da Base de Dados</span>
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <label>
          Host
          <input
            type="text"
            name="host"
            value={form.host}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Porta
          <input
            type="number"
            name="port"
            value={form.port}
            onChange={handleChange}
            required
            min={1}
            max={65535}
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Utilizador
          <input
            type="text"
            name="user"
            value={form.user}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Palavra-passe
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Nome da base de dados
          <input
            type="text"
            name="database"
            value={form.database}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </label>
        <button type="submit" style={{ marginTop: 16 }}>Testar Conexão</button>
      </form>
      {notification && (
        <div style={{ marginTop: 16, color: status === 'success' ? 'green' : 'red' }}>
          {notification}
        </div>
      )}
    </div>
  );
} 