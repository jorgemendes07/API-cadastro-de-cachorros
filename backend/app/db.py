import os
from sqlmodel import create_engine, Session

DB_PATH = os.getenv("DB_PATH", "cachorros.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()