const dbconnection = require('../db_connection');

const getCoordinationStatus = () => dbconnection.query('select * from coordination_status');

module.exports = getCoordinationStatus;
