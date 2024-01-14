FROM node:18-alpine3.17
WORKDIR /app

COPY . .
COPY package.json .
RUN npm install
RUN npm run build --production

EXPOSE 80
CMD ["npm", "run", "preview"]