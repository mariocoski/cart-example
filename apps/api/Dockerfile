FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps 

RUN npm run build:api

RUN ls -la

COPY . .

EXPOSE 3333

CMD ["node", "./dist/apps/api/main.js"]