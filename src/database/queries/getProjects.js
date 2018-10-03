const dbconnection = require('../db_connection');

const getProjects = data => dbconnection.query(
  "SELECT * FROM projects WHERE cla_ref like '%" + data.refno + "%' AND project_name LIKE '%" + data.projectname + "%' AND sector LIKE '%" + data.sector + "%' AND coordination_status_id =" + data.coordinationstatusid + " AND project_location LIKE '%"+data.location+"%';"
);


module.exports = getProjects;
