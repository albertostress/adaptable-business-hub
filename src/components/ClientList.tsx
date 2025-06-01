import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000';

interface ConnectionProps {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface Client {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  criado_em: string;
}

interface ClientListProps {
  connection: ConnectionProps;
}

export default function ClientList({ connection }: ClientListProps) {
  const [clientes, setClientes] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/get-clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(connection),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setClientes(data.clientes);
        } else {
          setError(data.error || 'Erro ao buscar clientes');
        }
      } catch (err: any) {
        setError('Erro de rede ou inesperado');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(connection)]);

  const handleRemove = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja remover este cliente?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/delete-client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...connection, id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setClientes((prev) => prev.filter((c) => c.id !== id));
      } else {
        setError(data.error || 'Erro ao remover cliente');
      }
    } catch (err: any) {
      setError('Erro de rede ou inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h3>Lista de Clientes</h3>
      {loading && <div>A carregar...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && clientes.length === 0 && <div>Nenhum cliente encontrado.</div>}
      {!loading && !error && clientes.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>ID</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Nome</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Telefone</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Email</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Criado em</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{c.id}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{c.nome}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{c.telefone}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{c.email}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{new Date(c.criado_em).toLocaleString()}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                  <button onClick={() => handleRemove(c.id)} style={{ color: 'red' }}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 