import type { Request, Response } from 'express';
import { Client } from 'pg';

// Handler para POST /api/delete-client
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const { host, port, user, password, database, id } = req.body;

  if (!host || !port || !user || !password || !database || !id) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta' });
  }

  const client = new Client({ host, port, user, password, database });

  const deleteSQL = 'DELETE FROM clientes WHERE id = $1';

  try {
    await client.connect();
    const result = await client.query(deleteSQL, [id]);
    await client.end();
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message || 'Erro ao remover cliente' });
  }
} 