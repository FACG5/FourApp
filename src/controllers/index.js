const express = require('express');
const error = require('./error');
const user = require('./users');
const projects = require('./projects');
const login = require('./login');
const projectDetails = require('./projectDetails');
const projectAdd = require('./projectAdd');
const projectEdit = require('./projectEdit');
const { authorize } = require('../middleware/authorize');

const router = express.Router();

router.get('/login', login.get);
router.post('/login', login.post);
router.get('/', authorize, projects.get);
router.get('/add_user', authorize, user.get);
router.post('/add_user', authorize, user.post);
router.get('/view_users', authorize, user.userIndex);
router.get('/projectadd', authorize, projectAdd.get);
router.post('/projectadd', authorize, projectAdd.post);
router.get('/projectDetails/:id', authorize, projectDetails.get);
router.get('/projectedit/:id', authorize, projectEdit.get);
router.post('/projectedit', authorize, projectEdit.post);
router.post('/view_users', authorize, user.authorization);
router.post('/getprojects', authorize, projects.getprojects);
router.get('/deleteproject/:id', authorize, projects.deleteProject);
router.get('/logout', login.logOut);
router.get('/projects/print/:id', projects.report);

router.use(error.client);
router.use(error.server);

module.exports = router;
