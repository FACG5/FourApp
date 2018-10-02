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

const checkUser = (username) => {
  const sql = {
    text: 'SELECT username FROM users WHERE username=$1',
    values: [username],
  };
  return dbConnection.query(sql);
};

const checkId = (idNumber) => {
  const sql = {
    text: 'SELECT id_number FROM users WHERE id_number=$1',
    values: [idNumber],
  };
  return dbConnection.query(sql);
};

module.exports = {
  addUser,
  checkUser,
  checkId
};
