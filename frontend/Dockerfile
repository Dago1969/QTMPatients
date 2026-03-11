# Container frontend per esporre l'app Angular sulla stessa porta usata in sviluppo.
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4202

CMD ["npm", "start", "--", "--host", "0.0.0.0"]