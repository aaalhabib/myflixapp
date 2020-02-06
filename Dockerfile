FROM nginx:stable-alpine AS WEB

WORKDIR /srv/www/static

COPY /var/lib/docker/volumes/jenkins_home/_data/workspace/myflix/ui-ms/dist .
EXPOSE 80
