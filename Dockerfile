FROM nginx:stable-alpine AS WEB

WORKDIR /srv/www/static

COPY ../../volumes/jenkins_home/_data/workspace/myflix/ui-ms/dist .
EXPOSE 80
