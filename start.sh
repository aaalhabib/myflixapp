#!/bin/bash
if [[ $APP_ENV == 'production' ]]; then
export volume_path=/var/lib/docker/volumes/jenkins_home/_data/workspace/myflixapp
rm -rf graph-data
docker-compose --no-ansi down 
docker-compose --no-ansi  up --no-color -d #run both files on prod for the nginx volume to be built -f docker-compose.yml -f production.yml
docker-compose  logs --no-color 
else
export volume_path=./
docker-compose down
docker-compose up
fi