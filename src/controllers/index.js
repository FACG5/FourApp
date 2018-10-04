const express = require('express');
const error = require('./error');
const user = require('./users');
const projects = require('./projects');
const login = require('./login');
const projectDetails = require('./projectDetails');
const projectAdd = require('./projectAdd');
const projectEdit = require('./projectEdit');

const router = express.Router();

router.get('/login', login.get);
router.post('/login', login.post);
router.get('/', projects.get);
router.get('/add_user', user.get);
router.post('/add_user', user.post);
router.get('/view_users', user.userIndex);
router.get('/projectadd', projectAdd.get);
router.post('/projectadd', projectAdd.post);
router.get('/projectDetails/:id', projectDetails.get);
router.get('/projectedit/:id', projectEdit.get);
router.post('/projectedit/:id', projectEdit.post);
router.post('/view_users', user.authorization);
router.post('/getprojects', projects.getprojects);

router.use(error.client);
router.use(error.server);

module.exports = router;
