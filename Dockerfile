FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD npx prisma migrate deploy && npm run start
