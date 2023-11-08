FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY build .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
