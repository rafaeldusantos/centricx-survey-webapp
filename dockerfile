# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:12.14-slim as node
WORKDIR /app
COPY package.json /app/
RUN rm -rf node_modules && npm cache clean --force
RUN npm install --loglevel verbose
COPY ./ /app/
ARG env=prod
RUN npm run build

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.13
COPY --from=node /app/dist/centricx-survey-webapp /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf