npm install --only=production
#add 20 sec for db to create DBs 
sleep 10 && npx pm2 start /opt/flix-payment/src/index.js --name my_flix-payment --no-daemon
