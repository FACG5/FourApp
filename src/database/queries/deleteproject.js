const dbconnection = require('../db_connection');

const deleteProject = id => dbconnection.query(
  {
    text: 'delete from projects where id = $1',
    values: [id],
  },
);
module.exports = deleteProject;
