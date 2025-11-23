from datetime import date
from sqlmodel import Field, SQLModel, create_engine, Session
from sqlalchemy import String
from fastapi import FastAPI, Depends

# Model

class Cachorro(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str = Field(index=True, max_length=100)
    raca: str = Field(max_length=50)
    data_nascimento: date = Field(sa_type=String)
    porte: str = Field(max_length=20)

# Configuração do db

sqlite_file_name = "cachorros.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

# Cria a tabela
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Dependência do db
def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

create_db_and_tables()

@app.post('/cachorros')
def cadastrar_cachorro(cachorro: Cachorro, session: Session = Depends(get_session)):
    session.add(cachorro)
    session.commit()
    session.refresh(cachorro)
    return cachorro