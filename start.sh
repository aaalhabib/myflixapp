#!/bin/bash
if [[ $APP_ENV == 'production' ]]; then
export volume_path=/var/lib/docker/volumes/jenkins_home/_data/workspace/myflixapp
docker-compose --no-ansi down 
docker-compose --no-ansi -f docker-compose.yml -f production.yml up --no-color -d #run both files on prod for the nginx volume to be built
docker-compose  logs --no-color 
else
export volume_path=./
docker-compose up
fi