FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala TODAS as dependências (dev e production)
RUN npm install

# Copia o restante do seu projeto
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Expõe a porta da sua API
EXPOSE 3333

# Aguarda o banco de dados estar pronto antes de iniciar
RUN apk add --no-cache bash
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Comando para iniciar sua aplicação
CMD ["/wait-for-it.sh", "db:5432", "--", "npm", "run", "dev"]