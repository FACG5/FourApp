const dbconnection = require('../db_connection');

const getProjectDetails = (id, cb) => {
  const sql = {
    text: 'SELECT projects.id, projects.sn, projects.cla_ref, projects.project_no, projects.project_name, projects.sector, projects.contractor_company, projects.contractor_name, projects.contractor_id, projects.donor, projects.project_location, projects.gps_x, projects.gps_y, projects.project_budget, projects.agreement_budget, projects.implementing_agency, projects.uploaded_File ,projects.submit_date, projects.approval_date, projects.justification_send, projects.justification_approval, projects.resubmit_date, projects.reapproval_date, projects.coordination_status_id, projects.coordination_percentage, projects.remaining_material, projects.coordination_starting, projects.coordination_completion, projects.project_status_id, projects.project_percentage, projects.project_starting, projects.project_completion, projects.description, coordination_status.status as co_status, project_status.status as pr_status FROM projects INNER JOIN coordination_status ON projects.coordination_status_id = coordination_status.id INNER JOIN project_status ON projects.project_status_id = project_status.id WHERE projects.id = $1',
    values: [id],
  };

  dbconnection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getProjectDetails;
