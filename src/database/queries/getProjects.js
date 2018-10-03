const dbconnection = require('../db_connection');

const getProjects = data => dbconnection.query(
  "SELECT * FROM projects WHERE cla_ref like '%" + data.refno + "%' and project_name like '%" + data.projectname + "%' and sector like '%" + data.sector + "%' and coordination_status_id =" + data.coordinationstatusid + " and project_location like '%"+data.location+"%';"
);


module.exports = getProjects;
