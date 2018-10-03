const dbconnection = require('../db_connection');

const getCoordinationStatus = () => dbconnection.query('SELECT * FROM coordination_status');

module.exports = getCoordinationStatus;
