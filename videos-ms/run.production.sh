npm install --only=production 
sleep 10 
npx knex migrate:latest
npx knex seed:run
#add 20 sec for db to create DBs 
npx pm2 start /opt/flix-videos/src/index.js --name my_flix-videos --no-daemon
