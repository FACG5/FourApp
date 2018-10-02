const dbconnection = require('../db_connection');

module.exports.getProjectStatus = () => dbconnection.query('select * from project_status');
