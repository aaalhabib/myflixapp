npm install --only=production 
#sleep 10 && npx knex migrate:latest
#add 20 sec for db to create DBs 
npx pm2 start /opt/flix-watches/src/index.js --name my_flix-watches --no-daemon
