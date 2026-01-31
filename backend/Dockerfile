
#  Escolhemos uma versão leve do Python
FROM python:3.12-slim

#  Evita que o Python gere arquivos .pyc e buffer de log
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Instala dependências do sistema necessárias para compilar pacotes
RUN apt-get update && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de dependências
COPY requirements.txt .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código do backend para dentro do container
COPY . .

# Rodar a aplicação (Produção)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]