from datetime import date
from sqlmodel import Field, SQLModel
from fastapi import FastAPI

class Cachorro(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str = Field(index=True, max_length=100)
    raca: str = Field(max_length=50)
    data_nascimento: date
    porte: str = Field(max_length=20)

app = FastAPI()

@app.get('/')
def hello():
    return {"message": "Hello!"}