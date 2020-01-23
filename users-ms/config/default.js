module.exports = {
  'host': 'localhost',
  'port': 3030,
  'public': '../public/',
  'paginate': {
    'default': 10,
    'max': 50
  },
  'authentication': {
    'entity': 'user',
    'service': 'api/users-ms/users',
    'secret': 'ifWbiJvq39QE0O/kaC4uQayCggg=',
    'authStrategies': [
      'jwt',
      'local'
    ],
    'jwtOptions': {
      'header': {
        'typ': 'access'
      },
      'audience': 'https://yourdomain.com',
      'issuer': 'feathers',
      'algorithm': 'HS256',
      'expiresIn': '1d'
    },
    'local': {
      'usernameField': 'email',
      'passwordField': 'password'
    }
  },
  'postgres': {
    'client': 'pg',
    'connection': process.env.DB_CON
  }
};
