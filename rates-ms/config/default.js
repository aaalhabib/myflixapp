module.exports ={
  'host': 'localhost',
  'port': 3033,
  'paginate': {
    'default': 10,
    'max': 50
  },
  'postgres': {
    'client': 'pg',
    'connection': process.env.DB_CON
  }
};
