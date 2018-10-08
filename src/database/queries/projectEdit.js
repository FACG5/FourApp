const db_connection = require('../db_connection');

const projectEdit = (object, cb) => {
  const sql = {
    text: 'UPDATE projects SET sn =$1, cla_ref = $2, project_no = $3, project_name = $4, sector = $5, contractor_company = $6, contractor_name = $7, contractor_id = $8, donor = $9, project_location = $10, gps_x = $11, gps_y = $12, project_budget = $13, agreement_budget = $14, implementing_agency  = $15, uploaded_File = $16,submit_date = $17, approval_date = $18, justification_send = $19, justification_approval = $20, resubmit_date = $21, reapproval_date =$22 , coordination_status_id =$23, coordination_percentage = $24, remaining_material = $25, coordination_starting = $26, coordination_completion = $27, project_status_id = $28, project_percentage = $29, project_starting = $30, project_completion = $31, description = $32 WHERE id = $33;',
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
      object.id,
    ],
  };
  db_connection.query(sql, (editerr, res) => {
    if (editerr) {
      cb(editerr);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = projectEdit;
