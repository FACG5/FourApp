
const dbconnection = require('../db_connection');

const checkUser = username => dbconnection.query(
  {
    text: 'SELECT * FROM users WHERE username=$1',
    values: [username],
  },
);


module.exports = checkUser;
