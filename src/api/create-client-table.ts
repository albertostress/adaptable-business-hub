import type { Request, Response } from 'express';
import { Client } from 'pg';

// Handler para POST /api/create-client-table
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const { host, port, user, password, database } = req.body;

  if (!host || !port || !user || !password || !database) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta' });
  }

  const client = new Client({ host, port, user, password, database });

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      telefone VARCHAR(20),
      email VARCHAR(100),
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await client.connect();
    await client.query(createTableSQL);
    await client.end();
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message || 'Erro ao criar tabela' });
  }
} 