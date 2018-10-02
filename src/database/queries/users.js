const dbConnection = require('../db_connection');

const addUser = (data, hash, role) => {
  const {
    name, username, email, idNumber, mobile, jobTitle,
  } = data;
  const sql = {
    text: 'INSERT INTO users (name,username,pass,email,id_number,mobile,role,job_title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    values: [name, username, hash, email, idNumber, mobile, role, jobTitle],
  };
  return dbConnection.query(sql);
};

const checkEmail = (email) => {
  const sql = {
    text: 'SELECT email FROM users WHERE email=$1',
    values: [email],
  };
  return dbConnection.query(sql);
};

module.exports = {
  addUser,
  checkEmail,
};
