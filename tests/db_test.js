const tape = require('tape');
const db_build = require('../src/database/db_build');
const checkUser = require('../src/database/queries/checkUser');
const getCoordinationStatus = require('../src/database/queries/getcoordinationstatus');
const getProjects = require('../src/database/queries/getProjects');
const projectAdd = require('../src/database/queries/projectAdd');
const projectDetails = require ('../src/database/queries/projectDetails');
const projectEdit = require ('../src/database/queries/projectEdit');
const getProjectStatus = require('../src/database/queries/getprojectstatus');
const { addUser, 
        viewUsers, 
        checkId, 
        checkMobile, 
        updateRole, 
        deleteUser } = require('../src/database/queries/users');

tape('Check username Not Found', (t) => {
  db_build((error, response) => {
    checkUser('username').then((res) => {
      t.equal(res.rowCount, 0, 'test should return 0');
      t.end();
    });
  });
});

tape('Check username found Found', (t) => {
  db_build((error, response) => {
    checkUser('melkhoudary').then((res) => {
      t.equal(res.rowCount, 1, 'test should return 1');
      t.equal(res.rows[0].name, 'Marwan Elkhoudary', 'test it should return name');
      t.equal(res.rows[0].email, 'marwangaza@hotmail.com', 'test it should return email');
      t.equal(res.rows[0].mobile, 595599633, 'test it should return mobile no.');
      t.equal(res.rows[0].id_number, 800640864, 'test it should return id no.');
      t.equal(res.rows[0].role, 'admin', 'test it should return role');
      t.equal(typeof (res.rows[0]), 'object', 'test it should return Object');
      t.equal(typeof (res.rows[0].name), 'string', 'test it should return type data string');
      t.equal(typeof (res.rows[0].mobile), 'number', 'test it should return type data number');
      t.equal(typeof (res.rows[0].id_number), 'number', 'test it should return type data number');
      t.end();
    });
  });
});


tape('Check add new user', (t) => {
  db_build((error, response) => {
    const data = {
      name: 'ali',
      username: 'aliali',
      hash: '@@@AAADDDDDD$$$$$SFSFSAF',
      email: 'ali@ali.com',
      idNumber: '888888888',
      mobile: '0597456555',
      role: 'admin',
      jobTitle: 'Employee',
    };
    addUser(data, '@@@AAADDDDDD$$$$$SFSFSAF', 'admin').then((res) => {
      t.equal(res.command, 'INSERT', 'test must return command type');
      t.equal(res.rowCount, 1, 'test must return row count = 1');
      t.equal(typeof res.rows, 'object', 'test should return data type of res');
      t.end();
    });
  });
});

tape('Check getCoordinationStatus query', (t) => {
  db_build((error, response) => {
    getCoordinationStatus().then((res) => {
      t.ok(res.rowCount > 0, true, 'test should return > 0');
      t.equal(res.command, 'SELECT', 'test should return command');
      t.equal(typeof res.rows, 'object', 'test should return data type of res');
      t.end();
    });
  });
});

tape('Check getProjectStatus', (t) => {
  db_build((error, response) => {
    getProjectStatus().then((res) => {
      t.ok(res.rowCount > 0, true, 'test should return > 0');
      t.equal(res.command, 'SELECT', 'test should return command');
      t.end();
    });
  });
});

tape('Check viewUsers query', (t) => {
  db_build((error, response) => {
    viewUsers('username').then((res) => {
      t.ok(res.rowCount > 0, true, 'test should return true');
      t.equal(res.command, 'SELECT', 'test should return command');
      t.end();
    });
  });
});

tape('Check checkId query with user found', (t) => {
  db_build((error, response) => {
    checkId(800640864).then((res) => {
      t.equal(res.rowCount, 1, 'test should return 1');
      t.end();
    });
  });
});

tape('Check checkId query with user not found', (t) => {
    db_build((error, response) => {
      checkId(000000000).then((res) => {
        t.equal(res.rowCount, 0, 'test should return 0');
        t.end();
      });
    });
  });

  tape('Check checkMobile query with mobile found', (t) => {
    db_build((error, response) => {
        checkMobile(595599633).then((res) => {
        t.equal(res.rowCount, 1, 'test should return 1');
        t.end();
      });
    });
  });

  tape('Check checkMobile query with mobile not found', (t) => {
    db_build((error, response) => {
        checkMobile(000000000).then((res) => {
        t.equal(res.rowCount, 0, 'test should return 0');
        t.end();
      });
    });
  });

  tape('Check updateRole query', (t) => {
    db_build((error, response) => {
      const data = {
       role:'user',
       userName:'melkhoudary'
      };
      updateRole(data).then((res) => {
        t.equal(res.command, 'UPDATE', 'test must return command type');
        t.equal(res.rowCount, 1, 'test must return row count = 1');
        t.end();
      });
    });
  });

  tape('Check updateRole query with user not found', (t) => {
    db_build((error, response) => {
      const data = {
       role:'user',
       userName:'delkhoudary'
      };
      updateRole(data).then((res) => {
        t.equal(res.command, 'UPDATE', 'test must return command type');
        t.equal(res.rowCount,0 , 'test must return row count = 0');
        t.end();
      });
    });
  });

  tape('Check  deleteUser query', (t) => {
    db_build((error, response) => {
        deleteUser('melkhoudary').then((res) => {
        t.equal(res.command, 'DELETE', 'test must return command type');
        t.equal(res.rowCount, 1, 'test must return row count = 1');
        t.end();
      });
    });
  });

  tape('Check  deleteUser query with user name not found', (t) => {
    db_build((error, response) => {
        deleteUser('notFound').then((res) => {
        t.equal(res.command, 'DELETE', 'test must return command type');
        t.equal(res.rowCount, 0, 'test must return row count = 1');
        t.end();
      });
    });
  });

  tape('Check getProjects query with found data', (t) => {
    db_build((error, response) => {
      const data ={
        refno:"G",
        projectname:"",
        sector:"",
        coordinationstatusid: "1",
        location:""
      }
      getProjects(data).then((res) => {
        t.ok(res.rowCount > 0, true, 'test should return > 0');
        t.equal(res.command, 'SELECT', 'test should return command name');
        t.end();
      });
    });
  });

  tape('Check getProjects query with not found data', (t) => {
    db_build((error, response) => {
      const data ={
        refno:"zzzz",
        projectname:"zzzz",
        sector:"zzzz",
        coordinationstatusid: "9",
        location:"zzzzz"
      }
      getProjects(data).then((res) => {
        t.ok(res.rowCount == 0, true, 'test should return == 0');
        t.equal(res.command, 'SELECT', 'test should return command name');
        t.end();
      });
    });
  });

  tape('Check projectAdd Query when done add dend null', (t) => {
    db_build((error, response) => {
      data ={
        sn:6,
        cla_ref:'GP-12275',
        project_no:152,
        project_name: 'Gaza Water',
        sector :'',
        contractor_company:'',
        contractor_name:'',
        contractor_id:'',
        donor:'',
        project_location:'',
        gps_x:'',
        gps_y:'',
        project_budget:'',
        agreement_budget:'',
        implementing_agency:'',
        uploaded_File:'',
        submit_date:'',
        approval_date:'',
        justification_send:'',
        justification_approval:'',
        resubmit_date:'',
        reapproval_date:'',
        coordination_status_id:'1',
        coordination_percentage:'',
        remaining_material:'',
        coordination_starting:'',
        coordination_completion:'',
        project_status_id:'1',
        project_percentage:'',
        project_starting:'',
        project_completion:'',
        description:'',
      }
      projectAdd(data, (err, res) =>{
        t.error(null);
        t.end();
      });
    });
  });

  tape('Check projectAdd Query when add cla_ref name found in data base', (t) => {
    db_build((error, response) => {
      data ={
        sn:6,
        cla_ref:'GP-10075',
        project_no:152,
        project_name: 'Gaza Water',
        sector :'',
        contractor_company:'',
        contractor_name:'',
        contractor_id:'',
        donor:'',
        project_location:'',
        gps_x:'',
        gps_y:'',
        project_budget:'',
        agreement_budget:'',
        implementing_agency:'',
        uploaded_File:'',
        submit_date:'',
        approval_date:'',
        justification_send:'',
        justification_approval:'',
        resubmit_date:'',
        reapproval_date:'',
        coordination_status_id:'1',
        coordination_percentage:'',
        remaining_material:'',
        coordination_starting:'',
        coordination_completion:'',
        project_status_id:'1',
        project_percentage:'',
        project_starting:'',
        project_completion:'',
        description:'',
      }
      projectAdd(data, (err, res) =>{
        t.equal(err.code, '23505', 'should return error code 23505');
        t.equal(err.detail, 'Key (cla_ref)=(GP-10075) already exists.', 'return Key (cla_ref)=(GP-10075) already exists.');
        t.end();
      });
    });
  });

  tape('Check project Details', (t) => {
    db_build((error, response) => {
      projectDetails('1', (err, res) => {
        t.ok(res.length > 0 , true, 'return true');
        t.equal(typeof res[0].id , 'number', 'return data type of id column number');
        t.equal(typeof res[0].cla_ref , 'string', 'return data type of cla_ref column string');
        t.end();
      });
    });
  });

  tape('Check projectAdd Query when add cla_ref name found in data base', (t) => {
    db_build((error, response) => {
      data ={
        sn:6,
        cla_ref:'GP-10075',
        project_no:152,
        project_name: 'Gaza Water',
        sector :'',
        contractor_company:'',
        contractor_name:'',
        contractor_id:'',
        donor:'',
        project_location:'',
        gps_x:'',
        gps_y:'',
        project_budget:'',
        agreement_budget:'',
        implementing_agency:'',
        uploaded_File:'',
        submit_date:'',
        approval_date:'',
        justification_send:'',
        justification_approval:'',
        resubmit_date:'',
        reapproval_date:'',
        coordination_status_id:'1',
        coordination_percentage:'',
        remaining_material:'',
        coordination_starting:'',
        coordination_completion:'',
        project_status_id:'1',
        project_percentage:'',
        project_starting:'',
        project_completion:'',
        description:'',
      }
      projectAdd(data, (err, res) =>{
        t.equal(err.code, '23505', 'should return error code 23505');
        t.equal(err.detail, 'Key (cla_ref)=(GP-10075) already exists.', 'return Key (cla_ref)=(GP-10075) already exists.');
        t.end();
      });
    });
  });

  tape('Check projectEdit Query', (t) => {
    db_build((error, response) => {
      data ={
        sn:1,
        cla_ref:'GP-10075',
        project_no:152,
        project_name: 'Gaza Water',
        sector :'',
        contractor_company:'',
        contractor_name:'',
        contractor_id:'',
        donor:'',
        project_location:'',
        gps_x:'',
        gps_y:'',
        project_budget:'',
        agreement_budget:'',
        implementing_agency:'',
        uploaded_File:'',
        submit_date:'',
        approval_date:'',
        justification_send:'',
        justification_approval:'',
        resubmit_date:'',
        reapproval_date:'',
        coordination_status_id:'1',
        coordination_percentage:'',
        remaining_material:'',
        coordination_starting:'',
        coordination_completion:'',
        project_status_id:'1',
        project_percentage:'',
        project_starting:'',
        project_completion:'',
        description:'',
      }
      projectDetails(1, (err, res) =>{
        t.error(null);
        t.end();
      });
    });
  });



tape.onFinish(() => process.exit(0));
