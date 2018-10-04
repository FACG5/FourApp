const db_connection = require('../db_connection');

const projectAdd = (object, cb) => {
  const sql = {
    text: 'INSERT INTO projects(sn, cla_ref, project_no, project_name, sector, contractor_company, contractor_name, contractor_id, donor, project_location, gps_x, gps_y, project_budget, agreement_budget, implementing_agency, uploaded_File,submit_date, approval_date, justification_send, justification_approval, resubmit_date, reapproval_date, coordination_status_id, coordination_percentage, remaining_material, coordination_starting, coordination_completion, project_status_id, project_percentage, project_starting, project_completion, description) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32);',
    values: [
      object.sn,
      object.cla_ref,
      object.project_no,
      object.project_name,
      object.sector,
      object.contractor_company,
      object.contractor_name,
      object.contractor_id,
      object.donor,
      object.project_location,
      object.gps_x,
      object.gps_y,
      object.project_budget,
      object.agreement_budget,
      object.implementing_agency,
      object.uploaded_File,
      object.submit_date,
      object.approval_date,
      object.justification_send,
      object.justification_approval,
      object.resubmit_date,
      object.reapproval_date,
      object.coordination_status_id,
      object.coordination_percentage,
      object.remaining_material,
      object.coordination_starting,
      object.coordination_completion,
      object.project_status_id,
      object.project_percentage,
      object.project_starting,
      object.project_completion,
      object.description,
    ],
  };

  db_connection.query(sql, (inserterr, res) => {
    if (inserterr) {
      cb(inserterr);
       } else {
      cb(null, res.rows);
    }
  });
};

module.exports = projectAdd;
