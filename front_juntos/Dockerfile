FROM node:16

RUN yarn global add @quasar/cli@1.1.3

RUN export PATH="$(yarn global bin):$PATH"

WORKDIR /front_juntos

COPY . .