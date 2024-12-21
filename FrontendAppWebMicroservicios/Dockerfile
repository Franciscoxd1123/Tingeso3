# Etapa de construcción
FROM node:20.18.0-alpine AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copiar la aplicación construida desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto en el que corre la aplicación
EXPOSE 80

# Definir el comando de ejecución
CMD ["nginx", "-g", "daemon off;"]