
import { useState, useEffect } from 'react';

interface DatabaseConnection {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface DatabaseStatus {
  connected: boolean;
  connection: DatabaseConnection | null;
  error: string | null;
}

export const useDatabaseConnection = () => {
  const [status, setStatus] = useState<DatabaseStatus>({
    connected: false,
    connection: null,
    error: null
  });

  useEffect(() => {
    // Carregar conexão salva do localStorage
    const savedConnection = localStorage.getItem('db_connection');
    const savedStatus = localStorage.getItem('db_status');
    
    if (savedConnection && savedStatus === 'success') {
      setStatus({
        connected: true,
        connection: JSON.parse(savedConnection),
        error: null
      });
    }
  }, []);

  const saveConnection = (connection: DatabaseConnection, connectionStatus: 'success' | 'error' | 'pending') => {
    if (connectionStatus === 'success') {
      localStorage.setItem('db_connection', JSON.stringify(connection));
      localStorage.setItem('db_status', 'success');
      setStatus({
        connected: true,
        connection,
        error: null
      });
    } else if (connectionStatus === 'error') {
      setStatus({
        connected: false,
        connection: null,
        error: 'Falha na conexão com o banco de dados'
      });
    }
  };

  const clearConnection = () => {
    localStorage.removeItem('db_connection');
    localStorage.removeItem('db_status');
    setStatus({
      connected: false,
      connection: null,
      error: null
    });
  };

  return {
    status,
    saveConnection,
    clearConnection
  };
};
