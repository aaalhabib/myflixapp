npm install --only=production
#add 20 sec for db to create DBs & users
sleep 100 && npx pm2 start /opt/flix-users/src/index.js --no-daemon --name my_flix-users --watch /opt/flix-users --ignore-watch node_modules
