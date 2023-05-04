FROM node:latest as build-stage
WORKDIR /
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /
COPY --from=build-stage /dist /
COPY nginx.conf /etc/nginx/nginx.conf
