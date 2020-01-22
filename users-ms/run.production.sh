npm install --only=production
#add 20 sec for db to create DBs & users
sleep 20 && npx pm2 start /opt/flix-users/src/index.js --name my_flix-users
