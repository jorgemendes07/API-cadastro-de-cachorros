# frontend/Dockerfile

# Gerar os arquivos estáticos
FROM node:20-alpine as build

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Captura a URL da API do docker-compose e disponibiliza para o build do Vite
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE

# Faz o build
RUN npm run build

# Nginx para servir os arquivos
FROM nginx:alpine

# Copia os arquivos gerados no estágio 1 para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia nossa configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Roda o Nginx
CMD ["nginx", "-g", "daemon off;"]