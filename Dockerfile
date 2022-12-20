FROM node:16.4-alpine
WORKDIR /app
COPY . .
RUN ["npm", "install"]
CMD ["npm", "start"]