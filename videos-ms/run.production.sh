npm install --only=production
npx knex seed:run
#add 20 sec for db to create DBs 
sleep 20 && npx pm2 start /opt/flix-videos/src/index.js --name my_flix-videos
