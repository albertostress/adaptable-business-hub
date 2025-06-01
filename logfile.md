# Diário de Bordo Técnico

Este ficheiro serve como um diário de bordo técnico para registar todas as alterações feitas no código a partir de agora, sempre que a IA realizar alguma tarefa a pedido do utilizador.

Cada entrada deve ser adicionada no topo do ficheiro e seguir o seguinte formato:

---

📆 **Data e hora:** 2024-05-21 18:00 (UTC+0)

🔧 **Tarefa feita:** Adicionada chamada à prop onClientAdded após inserção de cliente

📁 **Arquivos modificados/criados:**
- src/components/ClientCreateForm.tsx

💡 **Descrição do objetivo:**
Permitir que o componente pai seja notificado imediatamente após a inserção bem-sucedida de um novo cliente, facilitando atualização automática da lista.

⚠️ **Observações importantes:**
- A prop onClientAdded é obrigatória e chamada logo após sucesso na inserção.
- O tipo das props foi atualizado para receber connection e onClientAdded.

---

📆 **Data e hora:** 2024-05-21 17:00 (UTC+0)

🔧 **Tarefa feita:** Criado componente de configuração da base de dados (Database.tsx)

📁 **Arquivos modificados/criados:**
- src/pages/settings/Database.tsx

💡 **Descrição do objetivo:**
Implementar uma página de configuração da base de dados para o CRM, com formulário controlado, botão para testar conexão via API, estados visuais e notificações de sucesso/erro.

⚠️ **Observações importantes:**
- O componente utiliza apenas React hooks básicos (`useState`) e não depende de bibliotecas externas de formulários.
- O endpoint `/api/test-db-connection` deve estar implementado no backend para o teste funcionar corretamente.

---

📆 **Data e hora:** 2024-05-21 17:10 (UTC+0)

🔧 **Tarefa feita:** Criado endpoint POST para teste de conexão PostgreSQL (`test-db-connection.ts`)

📁 **Arquivos modificados/criados:**
- src/api/test-db-connection.ts

💡 **Descrição do objetivo:**
Permitir que o frontend teste credenciais de conexão PostgreSQL enviando um POST para `/api/test-db-connection`. O endpoint tenta conectar usando o pacote `pg` e retorna sucesso ou erro conforme o resultado.

⚠️ **Observações importantes:**
- É necessário instalar as dependências `pg` e `express` (`npm install pg express`).
- O endpoint espera ser usado num ambiente Node/Express ou adaptado conforme o backend do projeto.
- Lida com erros e métodos não permitidos de forma limpa.

---

📆 **Data e hora:** 2024-05-21 17:15 (UTC+0)

🔧 **Tarefa feita:** Criado endpoint POST para criar tabela clientes (`create-client-table.ts`)

📁 **Arquivos modificados/criados:**
- src/api/create-client-table.ts

💡 **Descrição do objetivo:**
Permitir que o frontend crie a tabela `clientes` na base PostgreSQL enviando um POST para `/api/create-client-table` com as credenciais. O endpoint executa o SQL de criação da tabela.

⚠️ **Observações importantes:**
- É necessário instalar as dependências `pg` e `express` (`npm install pg express`).
- O endpoint espera ser usado num ambiente Node/Express ou adaptado conforme o backend do projeto.
- Lida com erros e métodos não permitidos de forma limpa.

---

📆 **Data e hora:** 2024-05-21 17:18 (UTC+0)

🔧 **Tarefa feita:** Criado endpoint POST para inserir cliente (`add-client.ts`)

📁 **Arquivos modificados/criados:**
- src/api/add-client.ts

💡 **Descrição do objetivo:**
Permitir que o frontend adicione um novo cliente na tabela `clientes` da base PostgreSQL enviando um POST para `/api/add-client` com as credenciais e dados do cliente.

⚠️ **Observações importantes:**
- É necessário instalar as dependências `pg` e `express` (`npm install pg express`).
- O endpoint espera ser usado num ambiente Node/Express ou adaptado conforme o backend do projeto.
- Lida com erros e métodos não permitidos de forma limpa.

---

📆 **Data e hora:** 2024-05-21 17:21 (UTC+0)

🔧 **Tarefa feita:** Criado endpoint POST para inserir cliente (`insert-client.ts`)

📁 **Arquivos modificados/criados:**
- src/api/insert-client.ts

💡 **Descrição do objetivo:**
Permitir que o frontend adicione um novo cliente na tabela `clientes` da base PostgreSQL enviando um POST para `/api/insert-client` com as credenciais e dados do cliente.

⚠️ **Observações importantes:**
- É necessário instalar as dependências `pg` e `express` (`npm install pg express`).
- O endpoint espera ser usado num ambiente Node/Express ou adaptado conforme o backend do projeto.
- Lida com erros e métodos não permitidos de forma limpa.

---

📆 **Data e hora:** 2024-05-21 17:25 (UTC+0)

🔧 **Tarefa feita:** Criado componente React para inserção de clientes (`ClientCreateForm.tsx`)

📁 **Arquivos modificados/criados:**
- src/components/ClientCreateForm.tsx

💡 **Descrição do objetivo:**
Permitir a inserção de novos clientes na base de dados PostgreSQL através de um formulário controlado, enviando os dados para o endpoint `/api/insert-client`.

⚠️ **Observações importantes:**
- O componente recebe as credenciais da base de dados via props.
- Exibe mensagens de sucesso ou erro conforme a resposta da API.
- Usa apenas React hooks básicos (`useState`).

---

📆 **Data e hora:** 2024-05-21 17:28 (UTC+0)

🔧 **Tarefa feita:** Criado endpoint POST para listar clientes (`get-clients.ts`)

📁 **Arquivos modificados/criados:**
- src/api/get-clients.ts

💡 **Descrição do objetivo:**
Permitir que o frontend obtenha a lista de clientes da base PostgreSQL enviando um POST para `/api/get-clients` com as credenciais. O endpoint retorna todos os clientes da tabela `clientes`.

⚠️ **Observações importantes:**
- É necessário instalar as dependências `pg` e `express` (`npm install pg express`).
- O endpoint espera ser usado num ambiente Node/Express ou adaptado conforme o backend do projeto.
- Lida com erros e métodos não permitidos de forma limpa.

---

📆 **Data e hora:** 2024-05-21 17:32 (UTC+0)

🔧 **Tarefa feita:** Criado componente React para listagem de clientes (`ClientList.tsx`)

📁 **Arquivos modificados/criados:**
- src/components/ClientList.tsx

💡 **Descrição do objetivo:**
Permitir a listagem dos clientes da base de dados PostgreSQL, consumindo o endpoint `/api/get-clients` e exibindo os dados em tabela.

⚠️ **Observações importantes:**
- O componente recebe as credenciais da base de dados via props.
- Exibe mensagens de carregamento, erro e estado vazio.
- Usa apenas React hooks básicos (`useState`, `useEffect`).

---

📆 **Data e hora:** 2024-05-21 17:35 (UTC+0)

🔧 **Tarefa feita:** Criado endpoint POST para remover cliente (`delete-client.ts`)

📁 **Arquivos modificados/criados:**
- src/api/delete-client.ts

💡 **Descrição do objetivo:**
Permitir que o frontend remova um cliente da base PostgreSQL enviando um POST para `/api/delete-client` com as credenciais e o id do cliente.

⚠️ **Observações importantes:**
- É necessário instalar as dependências `pg` e `express` (`npm install pg express`).
- O endpoint espera ser usado num ambiente Node/Express ou adaptado conforme o backend do projeto.
- Retorna erro 404 se o cliente não for encontrado.
- Lida com erros e métodos não permitidos de forma limpa.

---

📆 **Data e hora:** 2024-05-21 17:38 (UTC+0)

🔧 **Tarefa feita:** Adicionado botão Remover na listagem de clientes (`ClientList.tsx`)

📁 **Arquivos modificados/criados:**
- src/components/ClientList.tsx

💡 **Descrição do objetivo:**
Permitir a remoção de clientes diretamente pela interface, integrando com o endpoint `/api/delete-client` e atualizando a lista em tempo real.

⚠️ **Observações importantes:**
- O botão pede confirmação antes de remover.
- A lista é atualizada automaticamente após remoção bem-sucedida.
- Mensagens de erro são exibidas em caso de falha.

---

📆 **Data e hora:** 2024-05-21 17:45 (UTC+0)

🔧 **Tarefa feita:** Implementado modal para adicionar conexão de banco de dados na página de configurações

📁 **Arquivos modificados/criados:**
- src/pages/Settings.tsx
- src/pages/settings/Database.tsx (adaptação para aceitar onSave)

💡 **Descrição do objetivo:**
Permitir ao utilizador adicionar e testar conexões de banco de dados via modal, armazenando os dados em useState e atualizando o estado visual para indicar conexão ativa.

⚠️ **Observações importantes:**
- O botão "Adicionar Conexão" abre um modal com o formulário Database.
- Após submissão e sucesso, a conexão é guardada em useState e o estado visual é atualizado.
- O componente Database foi adaptado para aceitar uma prop onSave.
- O ícone Database foi renomeado para DatabaseIcon para evitar conflitos de nomes.

---

📆 **Data e hora:** 2024-05-21 17:50 (UTC+0)

🔧 **Tarefa feita:** Criado servidor Express para expor endpoints do CRM (`server.ts`)

📁 **Arquivos modificados/criados:**
- server.ts

💡 **Descrição do objetivo:**
Centralizar e expor todos os endpoints de backend do CRM usando Express, facilitando o desenvolvimento e integração frontend-backend.

⚠️ **Observações importantes:**
- É necessário instalar as dependências: `express`, `cors`, `body-parser`, `pg` (`npm install express cors body-parser pg`).
- O servidor expõe todos os endpoints já criados em `/src/api/`.
- Porta padrão: 4000 (pode ser alterada via variável de ambiente PORT).

---

⚠️ Se não tiveres um backend dentro do próprio projeto (como em apps Vite puros), posso gerar um prompt alternativo para usar um pequeno servidor com Express ou com n8n.

Confirmas se o backend do teu projeto aceita `/api/*.ts` ou queres uma solução externa?


---

Depois disso, posso gerar o próximo prompt para:

- 📄 Listar os clientes
- ➕ Inserir novos
- 🧼 Validar dados com Zod
- 🔌 Integrar com n8n

Só dizer quando estiver pronto!


---

Assim que este endpoint estiver pronto, posso gerar o prompt para:

- Criar formulário React `ClientForm.tsx` com validação
- Integrar com esse endpoint
- Listar clientes
- Excluir ou editar registros

Diz só "✅ pronto" quando quiseres seguir!

---

📆 **Data e hora:** 2024-05-21 17:53 (UTC+0)

🔧 **Tarefa feita:** Atualizado fetch do teste de conexão para usar URL do backend

📁 **Arquivos modificados/criados:**
- src/pages/settings/Database.tsx

💡 **Descrição do objetivo:**
Evitar erro 404 ao testar conexão, garantindo que as chamadas vão para o backend Express na porta 4000.

⚠️ **Observações importantes:**
- O endpoint agora usa a constante API_BASE para montar a URL do backend.
- Se mudar o endereço do backend, basta alterar o valor de API_BASE.

---

📆 **Data e hora:** 2024-05-21 17:55 (UTC+0)

🔧 **Tarefa feita:** Atualizado fetch do ClientList.tsx para usar URL absoluta do backend

📁 **Arquivos modificados/criados:**
- src/components/ClientList.tsx

💡 **Descrição do objetivo:**
Garantir que as operações de listagem e remoção de clientes comuniquem corretamente com o backend Express, evitando erros 404 e ausência de dados.

⚠️ **Observações importantes:**
- Todas as chamadas fetch agora usam a constante API_BASE para montar a URL do backend.
- Se mudar o endereço do backend, basta alterar o valor de API_BASE.

---

📆 **Data e hora:** 2024-05-21 17:58 (UTC+0)

🔧 **Tarefa feita:** Implementada função handleAddClient no formulário de novo cliente

📁 **Arquivos modificados/criados:**
- src/components/ClientCreateForm.tsx

💡 **Descrição do objetivo:**
Garantir que o botão "Adicionar Cliente" envia os dados do formulário e da conexão para o endpoint correto do backend Express (`/api/add-client`).

⚠️ **Observações importantes:**
- A função handleAddClient junta os campos do formulário com os dados de conexão e faz o fetch para o backend.
- O endpoint agora é chamado via URL absoluta (API_BASE).

> Mantém este ficheiro sempre atualizado após cada modificação no projeto. Todas as entradas devem ser escritas em português e no formato markdown. 