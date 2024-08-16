# Usar una imagen base de Node.js para construir
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración y dependencias del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto
EXPOSE 80

# Iniciar Nginx
CMD ["npm", "run", "preview"]
