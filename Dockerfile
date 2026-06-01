FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=12345
ENV MONGO_URL=mongodb://host.docker.internal:27018

EXPOSE 12345

CMD ["npm", "start"]