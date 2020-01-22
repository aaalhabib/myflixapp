if [[ $APP_ENV == 'production' ]]; then
export volume_path=/var/lib/docker/volumes/jenkins_home/_data/workspace/myflixapp
docker-compose --no-ansi down 
docker-compose --no-ansi up --no-color -d
docker-compose  logs --no-color 
else
export volume_path=./
docker-compose up
fi