sleep 20 
npx knex migrate:latest
npx knex seed:run
npm run dev