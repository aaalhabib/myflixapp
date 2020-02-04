FROM nginx:stable-alpine AS WEB

WORKDIR /srv/www/static

COPY ./ui-ms/dist .
COPY  ./nginx.$APP_ENV.conf /etc/nginx/conf.d/default.conf
EXPOSE 80