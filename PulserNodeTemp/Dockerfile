FROM node:lts-alpine
ENV NODE_ENV=production
ENV NODE_CONTAINER=TIM
WORKDIR /usr/src
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src
USER root
RUN npm install -g ts-node
#CMD ["tail", "-f","/dev/null"]
CMD ["ts-node", "src/app.ts"]