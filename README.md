# Gerenciamento para hospedagens de cachorros

Aplicação web full stack para cadastro e gerenciamento de cachorros, desenvolvida com FastAPI no backend e React no frontend.

O projeto foi criado com foco em organização do código, separação de responsabilidades e comunicação entre frontend e backend por meio de uma API REST.

Demo: http://52.23.239.39/

---

## Tecnologias utilizadas

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Banco de dados relacional

### Frontend
- React
- JavaScript
- HTML
- CSS
- Axios

---

## Funcionalidades

- Cadastro de cachorros
- Listagem de registros
- Visualização de detalhes
- Atualização de dados
- Remoção de registros
- Consumo de API REST no frontend

---

## Organização do projeto

O backend segue uma estrutura organizada, com separação entre:
- rotas
- regras de negócio
- modelos
- schemas

O frontend consome a API utilizando requisições HTTP e realiza o gerenciamento de estado da aplicação de forma simples e clara.

---

## Como rodar o projeto localmente

### Backend

Crie e ative um ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate 
```

Instale as dependencias:

```bash
pip install -r requirements.txt
```

Inicie a aplicação

```bash
uvicorn app.main:app --reload
```

Popular dados para demonstração:

```bash
python seed.py
```

### Frontend

Instale as dependencias:

```bash
npm install
```

Inicie a aplicação

```bash
npm run dev
```
o frontend estará disponível em:

```bash
http://localhost:5173

```