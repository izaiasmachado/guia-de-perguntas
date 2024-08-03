FROM node:20

ENV GUIAPERGUNTAS_NODE_ENV=production

WORKDIR /app

COPY package.json /app
COPY prisma/ /app/prisma
COPY public/ /app/public

RUN npm install

COPY src/ /app/src

RUN ["npm", "install", "-g", "prisma"]
CMD ["npm", "run", "start:migrate:prod"]

EXPOSE 3333