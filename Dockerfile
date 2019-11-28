FROM node:11.13.0-alpine

# Setup env
ENV APP_HOME /project
ARG API_URL
WORKDIR $APP_HOME

# Install Node packages
RUN cd $APP_HOME
COPY package* $APP_HOME/
RUN npm install

# Copy project files
COPY . $APP_HOME
RUN API_URL=$API_URL npm run build

# Allow Node to open Docker port
ENV NUXT_HOST=0.0.0.0
EXPOSE 3000

# Start webserver
CMD [ "npm", "start" ]
