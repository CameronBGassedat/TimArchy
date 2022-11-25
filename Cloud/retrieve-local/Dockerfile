FROM node:alpine

RUN npm install --production --silent && mv node_modules ../
RUN chown -R node /usr/src
USER root
RUN npm install -g ts-node