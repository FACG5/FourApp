const express = require('express');
const error = require('./error');
const projects = require('./projects');
const login = require('./login');
const { authorize } = require('../middleware/authorize');

const router = express.Router();
router.get('/', authorize, projects.get);
router.post('/getprojects', authorize, projects.getprojects);
router.get('/deleteproject/:id', authorize, projects.deleteProject);

router.get('/login', login.get);
router.post('/login', login.post);
router.get('/logout', login.logOut);
router.use(error.client);
router.use(error.server);

module.exports = router;
