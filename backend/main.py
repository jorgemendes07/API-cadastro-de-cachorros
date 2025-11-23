from datetime import date
from sqlmodel import Field, SQLModel, create_engine, Session, select
from sqlalchemy import String
from fastapi import FastAPI, Depends, HTTPException

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

# Criar cachorro
@app.post("/cachorros")
def cadastrar_cachorro(cachorro: Cachorro, session: Session = Depends(get_session)):
    session.add(cachorro)
    session.commit()
    session.refresh(cachorro)
    return cachorro

# Listar todos os cachorros
@app.get("/cachorros", response_model=list[Cachorro])
def listar_cachorros(session: Session = Depends(get_session)):
    selecao = select(Cachorro)
    resultado = session.exec(selecao)
    cachorros = resultado.all()
    return cachorros

# Visualizar cachorro pela id
@app.get("/cachorros/{cachorro_id}", response_model=Cachorro)
def selecionar_cachorro_pelo_id(cachorro_id: int, session: Session = Depends(get_session)):
    cachorro_selecionado = session.get(Cachorro, cachorro_id)
    if not cachorro_selecionado:
        raise HTTPException(status_code=404, detail="Cachorro não encontrado")
    return cachorro_selecionado