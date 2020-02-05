npm install --only=production
#add 20 sec for db to create DBs 
npx pm2 start /opt/flix-rates/src/index.js --name my_flix-rates --no-daemon
