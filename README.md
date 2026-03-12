# Knex Case Backend - API de Vendas Corporativas

Esta é uma API RESTful desenvolvida como desafio para a Knex. O sistema gerencia usuários (consumidores e colaboradores), produtos e transações, com regras rigorosas de autorização entre empresas (Apple vs Samsung).

## Tecnologias Utilizadas

- **Node.js** & **TypeScript**
- **Express** (Framework Web)
- **Knex.js** (Query Builder)
- **SQLite3** (Banco de Dados em arquivo)
- **JWT** (Autenticação Stateless)
- **Bcryptjs** (Criptografia de senhas)

## Funcionalidades Principais

- **Autenticação:** Sistema de login com geração de Token JWT.
- **Autorização por Empresa:** Colaboradores só podem editar/excluir produtos pertencentes à sua própria empresa.
- **Diferenciação de Perfis:** Usuários sem vínculo com empresa são tratados como Consumidores.
- **Persistência:** Registro de transações de compra.
- **Auto-Setup:** O banco de dados e as empresas iniciais são criados automaticamente ao rodar o projeto.

## Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU_USUARIO/knex-case-backend.git](https://github.com/SEU_USUARIO/knex-case-backend.git)
cd knex-case-backend
```
### 2. Instalar dependências
```bash
npm install
```
### 3. Crie um arquivo .env na raiz do projeto e adicione:
```bash
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```
### 4. Executar a aplicação
```bash
npm run dev
```
A API vai estar disponível em http://localhost:3000
