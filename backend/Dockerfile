ARG APP_PORT
ARG NODE_ENV

FROM node:slim AS build

WORKDIR /opt/application

RUN apt-get update && apt-get install -y procps

COPY package*.json ./
RUN npm install

COPY . .
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE ${APP_PORT}
ENV NODE_ENV=${NODE_ENV} \
    PORT=${APP_PORT}

ENTRYPOINT ["entrypoint.sh"]
CMD []
