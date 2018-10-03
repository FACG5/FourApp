const dbconnection = require('../db_connection');

const getProjects = (data) => {
  let sql = '';
  if (data.coordinationstatusid !== '0') {
    sql = `SELECT projects.* FROM projects  WHERE cla_ref like '%${data.refno}%' and project_name like '%${data.projectname}%' and sector like '%${data.sector}%' and coordination_status_id = ${data.coordinationstatusid} and project_location like '%${data.location}%';`;
  } else {
    sql = `SELECT projects.* FROM projects  WHERE cla_ref like '%${data.refno}%' and project_name like '%${data.projectname}%' and sector like '%${data.sector}%' and project_location like '%${data.location}%';`;
  }
  return dbconnection.query(sql);
};

module.exports = getProjects;
