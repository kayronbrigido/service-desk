# Imagem base leve com Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Nest.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start:dev"]
