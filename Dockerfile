FROM node:latest as build
WORKDIR /indulasch-frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as nginx
COPY --from=0 /indulasch-frontend/build ./indulasch-frontend
COPY default.conf /etc/nginx/conf.d