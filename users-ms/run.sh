npm install --only=production
npx pm2 start /opt/flix-users/src/index.js --no-daemon --name my_flix-users --watch /opt/flix-users --ignore-watch node_modules
