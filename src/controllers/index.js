const express = require('express');
const error = require('./error');
const projects = require('./projects');
const login = require('./login');

const router = express.Router();
router.get('/', projects.get);
router.post('/getprojects', projects.getprojects);
router.get('/deleteproject/:id', projects.deleteProject);

router.get('/login', login.get);
router.post('/login', login.post);
router.use(error.client);
router.use(error.server);

module.exports = router;
