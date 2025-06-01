import type { Request, Response } from 'express';
import { Client } from 'pg';

// Handler para POST /api/insert-client
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const { host, port, user, password, database, nome, telefone, email } = req.body;

  if (!host || !port || !user || !password || !database || !nome || !telefone || !email) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta' });
  }

  const client = new Client({ host, port, user, password, database });

  const insertSQL = 'INSERT INTO clientes (nome, telefone, email) VALUES ($1, $2, $3);';

  try {
    await client.connect();
    await client.query(insertSQL, [nome, telefone, email]);
    await client.end();
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message || 'Erro ao inserir cliente' });
  }
} 