const dbconnection = require('../db_connection');

const getProjectStatus = () => dbconnection.query('SELECT * FROM project_status');

module.exports = getProjectStatus;
