FROM node:16 as develop-stage

WORKDIR /tisaude/

COPY . .

FROM develop-stage AS deploy-state

COPY . .

RUN yarn

CMD [ "yarn", "start" ]

EXPOSE 80