FROM nginx:stable-alpine AS WEB

WORKDIR /srv/www/static

COPY ./ui-ms/dist .
EXPOSE 80
