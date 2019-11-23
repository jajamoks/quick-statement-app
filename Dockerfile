FROM node:11.13.0-alpine

ENV APP_HOME /project
WORKDIR /usr/src/nuxt-app

ENV APP_HOME /project
WORKDIR $APP_HOME

COPY . $APP_HOME
RUN cd $APP_HOME
RUN npm install
RUN npm run build

ENV NUXT_HOST=0.0.0.0

EXPOSE 3000
CMD [ "npm", "start" ]
