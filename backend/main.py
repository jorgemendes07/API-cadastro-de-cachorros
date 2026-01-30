from datetime import date # validação de datas
from sqlmodel import Field, SQLModel, create_engine, Session, select
from sqlalchemy import String, Date
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import os

# Model
class Cachorro(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str = Field(index=True, max_length=100)
    raca: str = Field(max_length=50)
    data_nascimento: date = Field(sa_type=String)
    porte: str = Field(max_length=20)
    nome_tutor: str | None = Field(default=None, max_length=100)
    contato: str | None = Field(default=None, max_length=11)
    contato_2: str | None = Field(default=None, max_length=11)
    endereco_tutor: str | None = Field(default=None, max_length=255)
    castrado: bool | None = Field(default=None)
    vacina_antirrabica: date | None = Field(default=None, sa_type=String)
    vacina_polivalente: date | None = Field(default=None, sa_type=String)
    passeia: bool | None = Field(default=None)
    necessidades_em_casa: bool | None = Field(default=None)
    plano_de_saude: bool | None = Field(default=None)
    nome_plano_de_saude: str | None = Field(default=None, max_length=100)
    contato_veterinario: str | None = Field(default=None, max_length=11)
    endereco_clinica_veterinaria: str | None = Field(default=None, max_length=255)
    contato_clinica_veterinaria_24_horas: str | None = Field(default=None, max_length=11)
    endereco_clinica_veterinaria_24_horas: str | None = Field(default=None, max_length=255)
    restricao_alimentar: bool | None = Field(default=None)
    descricao_restricao_alimentar: str | None = Field(default=None, max_length=255)
    horario_alimentacao_manha: str | None = Field(default=None, max_length=50)
    porcao_alimentacao_manha: str | None = Field(default=None, max_length=100)
    horario_alimentacao_tarde: str | None = Field(default=None, max_length=50)
    porcao_alimentacao_tarde: str | None = Field(default=None, max_length=100)
    horario_alimentacao_noite: str | None = Field(default=None, max_length=50)
    porcao_alimentacao_noite: str | None = Field(default=None, max_length=100)
    restricao_medica: bool | None = Field(default=None)
    descricao_restricao_medica: str | None= Field(default=None, max_length=255)
    utiliza_medicacao: bool | None = Field(default=None)
    descricao_utiliza_medicacao: str | None = Field(default=None, max_length=500)
    comportamento: str | None = Field(default=None, max_length=1000)
    medo: str | None = Field(default=None, max_length=1000)
    relacionamento_com_outros_animais: str | None = Field(default=None, max_length=1000)
    relacionamento_com_pessoas: str | None = Field(default=None, max_length=1000)
    dependente: bool | None = Field(default=None)
    experiencia_com_hospedagem: bool | None = Field(default=None)
    descricao_experiencia_com_hospedagem: str | None = Field(default=None, max_length=255)
    posse_alimento: bool | None = Field(default=None)
    posse_objeto: bool | None = Field(default=None)
    descricao_posse_objeto: str | None = Field(default=None, max_length=255)

# Configuração do db

DB_PATH = os.getenv("DB_PATH", "cachorros.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

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

# Caminho absoluto para a pasta dist do frontend
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")

# Configuração do CORS
origins = ["*"]

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