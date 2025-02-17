# 📄 Sistema de Tramitação de Documentos - Backend

O backend deste projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Prisma**
- **NPM**
- **TypeScript**
- **Nestjs**
- **Postgres**

## 🏗️ Como Instalar e Executar o Projeto

### 🔽 Clonar o Repositório

```sh
git clone git@github.com:kamilapantoja/sistema-tramitacao-documentos-backend.git
```

### 📂 Acessar a pasta do projeto

```sh
cd sistema-tramitacao-documentos-backend
```

Primeiramente, você deverá configurar a conexão com o banco e colocar o caminho da pasta onde você quer guardar os anexos dos documentos. No arquivo .ENV existem variáveis para esta configuração, como no exemplo abaixo:

```sh
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/postgres"
UPLOAD_FOLDER="CAMINHO DA PASTA ONDE SERÃO GUARDADOS DOS PDFs"
```

### 📦 Instalar as dependências

```sh
npm install
```

### 📦 Gerar as tabelas no banco

```sh
npx prisma db push
```

### 📦 Gerar as seeds para popular as tabelas

```sh
npx ts-node prisma/seed.ts
```

### 🚀 Rodar o projeto localmente

```sh
npm run dev
```
