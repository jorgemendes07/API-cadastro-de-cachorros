from app.db import engine
from app.models import Cachorro
from app.seed import seed_database
from sqlmodel import SQLModel, Session, delete

def reset():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        session.exec(delete(Cachorro))
        session.commit()
    seed_database()
    print("Banco resetado com sucesso")

if __name__ == "__main__":
    reset()