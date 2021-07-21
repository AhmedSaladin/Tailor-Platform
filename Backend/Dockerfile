FROM node:14

LABEL maintainer="Ahmed Saladin"

COPY . /app

WORKDIR  /app

RUN npm install

EXPOSE 8080

CMD [ "node", "index.js" ]