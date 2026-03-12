# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # ← ¡SOLO build!

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Borra archivos por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos estáticos exportados
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
