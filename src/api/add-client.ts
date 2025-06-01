import type { Request, Response } from 'express';
import { Client } from 'pg';

// Handler para POST /api/add-client
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const {
    host, port, user, password, database,
    nome, email, telefone, empresa,
    status, valor, endereco, tags, ultimo_contato
  } = req.body;

  if (!host || !port || !user || !password || !database || !nome || !telefone || !email) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta' });
  }

  const client = new Client({ host, port, user, password, database });

  const insertSQL = `
    INSERT INTO clientes
    (nome, email, telefone, empresa, status, valor, endereco, tags, ultimo_contato)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  try {
    await client.connect();
    await client.query(insertSQL, [
      nome, email, telefone, empresa, status, valor, endereco, tags, ultimo_contato
    ]);
    await client.end();
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message || 'Erro ao inserir cliente' });
  }
} 