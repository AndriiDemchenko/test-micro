FROM node:18-alpine

WORKDIR /usr/src/auth-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start:prod"]
