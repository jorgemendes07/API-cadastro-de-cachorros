from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, SQLModel
from app.db import engine, get_session
from app.models import Cachorro
from app.seed import seed_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine, checkfirst=True)
    try:
        seed_database()
    except Exception as e:
        print(f"Erro ao rodar seed: {e}")
    yield

app = FastAPI(lifespan=lifespan)

# Configuração do CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Criar Cachorro
@app.post("/api/cachorros", response_model=Cachorro)
def cadastrar_cachorro(cachorro: Cachorro, session: Session = Depends(get_session)):
    session.add(cachorro)
    session.commit()
    session.refresh(cachorro)
    return cachorro

# Listar todos os cachorros
@app.get("/api/cachorros", response_model=list[Cachorro])
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
@app.get("/api/cachorros/{cachorro_id}", response_model=Cachorro)
def selecionar_cachorro_pelo_id(cachorro_id: int, session: Session = Depends(get_session)):
    cachorro_selecionado = session.get(Cachorro, cachorro_id)
    if not cachorro_selecionado:
        raise HTTPException(status_code=404, detail="Cachorro não encontrado")
    return cachorro_selecionado

# Atualizar Cachorro
@app.put("/api/cachorros/{cachorro_id}", response_model=Cachorro)
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
@app.delete("/api/cachorros/{cachorro_id}")
def deletar_cachorro(cachorro_id: int, session: Session = Depends(get_session)):
        cachorro_selecionado = session.get(Cachorro, cachorro_id)
        if not cachorro_selecionado:
            raise HTTPException(status_code=404, detail="Cachorro não encontrado")
        session.delete(cachorro_selecionado)
        session.commit()
        return cachorro_selecionado