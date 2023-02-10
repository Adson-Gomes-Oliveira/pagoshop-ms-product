FROM node:16.4-alpine
WORKDIR /app/product
COPY package*.json ./
COPY .npmrc ./
RUN npm install
COPY . ./
ENTRYPOINT npm start