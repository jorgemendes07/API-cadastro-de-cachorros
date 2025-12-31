from datetime import date
from sqlmodel import Field, SQLModel, create_engine, Session, select
from sqlalchemy import String
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

# Model
class Cachorro(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str = Field(index=True, max_length=100)
    raca: str = Field(max_length=50)
    data_nascimento: date = Field(sa_type=String)
    porte: str = Field(max_length=20)
    nome_tutor: str | None = Field(default= None, max_length=100)
    contato: str | None = Field(default=None, max_length=11)

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

# Configuração do CORS
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

create_db_and_tables()

# Criar Cachorro
@app.post("/cachorros")
def cadastrar_cachorro(cachorro: Cachorro, session: Session = Depends(get_session)):
    session.add(cachorro)
    session.commit()
    session.refresh(cachorro)
    return cachorro

# Listar todos os cachorros
@app.get("/cachorros", response_model=list[Cachorro])
def listar_cachorros(
    session: Session = Depends(get_session),
    ordenar_por: str = Query("nome", enum=["nome", "raca", "porte"])
    ):
    selecao = select(Cachorro)
    if ordenar_por == "raca":
        selecao = selecao.order_by(Cachorro.raca)
    elif ordenar_por == "porte":
        selecao = selecao.order_by(Cachorro.porte)
    else:
        selecao = selecao.order_by(Cachorro.nome)
        
    resultado = session.exec(selecao)
    cachorros = resultado.all()
    return cachorros

# Visualizar Cachorro pela id
@app.get("/cachorros/{cachorro_id}", response_model=Cachorro)
def selecionar_cachorro_pelo_id(cachorro_id: int, session: Session = Depends(get_session)):
    cachorro_selecionado = session.get(Cachorro, cachorro_id)
    if not cachorro_selecionado:
        raise HTTPException(status_code=404, detail="Cachorro não encontrado")
    return cachorro_selecionado

# Atualizar Cachorro
@app.put("/cachorros/{cachorro_id}", response_model=Cachorro)
def atualizar_cachorro(cachorro_id: int, novos_dados: Cachorro, session: Session = Depends(get_session)):
    cachorro_selecionado = session.get(Cachorro, cachorro_id)
    if not cachorro_selecionado:
        raise HTTPException(status_code=404, detail="Cachorro não encontrado")
    
    dados_dict = novos_dados.model_dump(exclude_unset=True)
    dados_dict.pop("id", None)

    for key, value in dados_dict.items():
        setattr(cachorro_selecionado, key, value)

    session.add(cachorro_selecionado)
    session.commit()
    session.refresh(cachorro_selecionado)
    return cachorro_selecionado

# Deletar Cachorro
@app.delete("/cachorros/{cachorro_id}")
def deletar_cachorro(cachorro_id: int, session: Session = Depends(get_session)):
        cachorro_selecionado = session.get(Cachorro, cachorro_id)
        if not cachorro_selecionado:
            raise HTTPException(status_code=404, detail="Cachorro não encontrado")
        session.delete(cachorro_selecionado)
        session.commit()
        return cachorro_selecionado