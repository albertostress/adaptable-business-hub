import type { Request, Response } from 'express';
import { Client } from 'pg';

// Handler para POST /api/test-db-connection
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
    await client.end();
    return res.status(200).json({ success: true });
  }catch (error: any) {
    console.error("Erro ao conectar ao PostgreSQL:", error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
} 