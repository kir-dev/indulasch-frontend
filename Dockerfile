FROM node:latest as build
WORKDIR /indulasch-frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
# NGINX stage missing