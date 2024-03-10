FROM node:latest
WORKDIR /app

COPY careflow-app/package.json /app/
COPY careflow-app/package-lock.json /app/
COPY careflow-app/public/ /app/public

COPY . /app
RUN npm install
EXPOSE 3000
CMD npm start
