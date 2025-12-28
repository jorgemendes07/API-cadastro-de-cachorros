from sqlalchemy import text
from sqlmodel import create_engine, Session

sqlite_file_name = "cachorros.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url)

def adicionar_coluna():
    with Session(engine) as session:
        comando = text("ALTER TABLE cachorro ADD COLUMN nome_tutor TEXT")

        try:
            session.exec(comando)
            session.commit()
            print("Coluna adicionada")
        except Exception as e:
            print(f"Erro ou coluna já existente: {e}")

if __name__ == "__main__":
    adicionar_coluna()