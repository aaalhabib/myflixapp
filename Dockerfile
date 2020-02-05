FROM nginx:stable-alpine AS WEB

WORKDIR /srv/www/static
RUN rm -rf css/ js/
COPY ./ui-ms/dist .
EXPOSE 80
