npm install --only=production 
#add 20 sec for db to create DBs 
sleep 10 && npx pm2 start /opt/flix-recommendations/src/index.js --name my_flix-recommendations --no-daemon