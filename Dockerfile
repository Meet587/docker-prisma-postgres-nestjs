ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY prisma ./prisma

RUN npx prisma generate
# RUN npx prisma migrate dev --name init_tasks

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
# CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]
