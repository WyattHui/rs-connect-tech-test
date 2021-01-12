FROM node:15.5.1-alpine
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8080
CMD node index.js