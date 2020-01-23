npm install --only=production 
sleep 20 
npx knex migrate:run 
npx knex seed:run
#add 20 sec for db to create DBs 
npx pm2 start /opt/flix-videos/src/index.js --name my_flix-videos --no-daemon
