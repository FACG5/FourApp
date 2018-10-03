const dbconnection = require('../db_connection');

const getAllProjects = () => dbconnection.query(
  'SELECT projects.*, coordination_status.status as coordinationstatus FROM projects inner join coordination_status on projects.coordination_status_id = coordination_status.id ;',
);
module.exports = getAllProjects;
