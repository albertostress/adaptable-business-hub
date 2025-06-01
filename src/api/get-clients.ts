import type { Request, Response } from 'express';
import { Client } from 'pg';

// Handler para POST /api/get-clients
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const { host, port, user, password, database } = req.body;

  if (!host || !port || !user || !password || !database) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta' });
  }

  const client = new Client({ host, port, user, password, database });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM clientes ORDER BY id DESC');
    await client.end();
    return res.status(200).json({ success: true, clientes: result.rows });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message || 'Erro ao buscar clientes' });
  }
} 