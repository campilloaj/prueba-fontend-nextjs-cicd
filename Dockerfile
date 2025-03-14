# Usamos una imagen base de Node.js (especificamos la versión que necesitas)
FROM node:18-alpine

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json (o yarn.lock) primero para instalar las dependencias
COPY package*.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos todo el código fuente de la aplicación al contenedor
COPY . .

# Compilamos el proyecto de Next.js
RUN npm run build

# Exponemos el puerto en el que Next.js escuchará (por defecto Next.js usa el puerto 3000)
EXPOSE 3000

# Definimos el comando para ejecutar la aplicación en producción
CMD ["npm", "start"]