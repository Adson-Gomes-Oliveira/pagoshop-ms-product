FROM node:18-alpine
WORKDIR /app/product
COPY package.json ./
RUN npm install
COPY . ./
ENTRYPOINT npm start