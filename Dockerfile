FROM node:16.4-alpine
WORKDIR /app/product
COPY package*.json ./
RUN npm install
COPY .npmrc ./
COPY . ./
ENTRYPOINT npm start