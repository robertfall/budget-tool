FROM node:7.3.0-alpine

WORKDIR /app
RUN npm install -g yarn

EXPOSE 3000