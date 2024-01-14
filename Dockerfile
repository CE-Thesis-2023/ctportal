FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.24.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]