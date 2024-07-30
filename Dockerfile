# Etapa de construção
FROM node:20 AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile o TypeScript
RUN npm run build

# Etapa de produção
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie as dependências da etapa de construção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponha a porta que a aplicação irá rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["node", "dist/app.js"]
