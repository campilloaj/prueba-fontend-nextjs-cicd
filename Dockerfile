# Usamos una imagen base de Node.js (especificamos la versión que necesitas)
FROM node:18 AS builder

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json (o yarn.lock) primero para instalar las dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos todo el código fuente de la aplicación al contenedor
COPY . .

# Compilamos el proyecto de Next.js
RUN npm run build

# Etapa para ejecutar la aplicación
FROM node:18 AS runner

# Exponemos el puerto en el que Next.js escuchará (por defecto Next.js usa el puerto 3000)
EXPOSE 3000

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar dependencias de la etapa anterior
COPY --from=builder /app/node_modules ./node_modules

# Copiar los archivos construidos y las páginas estáticas
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Definimos el comando para ejecutar la aplicación en producción
CMD ["npm", "start"]