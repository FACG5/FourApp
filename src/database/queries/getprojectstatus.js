const dbconnection = require('../db_connection');

module.exports.getProjectStatus = () => dbconnection.query('SELECT * FROM project_status');
