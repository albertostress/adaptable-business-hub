import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import testDbConnection from './src/api/test-db-connection';
import createClientTable from './src/api/create-client-table';
import addClient from './src/api/add-client';
import insertClient from './src/api/insert-client';
import getClients from './src/api/get-clients';
import deleteClient from './src/api/delete-client';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/test-db-connection', testDbConnection);
app.post('/api/create-client-table', createClientTable);
app.post('/api/add-client', addClient);
app.post('/api/insert-client', insertClient);
app.post('/api/get-clients', getClients);
app.post('/api/delete-client', deleteClient);

app.get('/', (req, res) => {
  res.send('CRM Backend API rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend do CRM rodando na porta ${PORT}`);
}); 