const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

let DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error('Enviroment variable DB_URL must be set');
}

if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL;
}
const params = url.parse(process.env.DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  user: username,
  password,
  ssl: params.hostname !== 'localhost',
};

module.exports = new Pool(options);
