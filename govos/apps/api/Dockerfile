FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

CMD ["npm", "run", "start"]
