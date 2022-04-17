FROM node:16

ENV NODE_ENV production

WORKDIR /code

ADD yarn.lock package.json /code

RUN yarn install

ADD . /code

CMD ['yarn',]



