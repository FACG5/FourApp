const express = require('express');
const error = require('./error');
const addUser = require('./users');
const projects = require('./projects');
const login = require('./login');

const router = express.Router();

router.get('/login', login.get);
router.post('/login', login.post);
router.get('/', projects.get);
router.get('/add_user', addUser.get);
router.post('/add_user', addUser.post);
router.post('/getprojects', projects.getprojects);


router.use(error.client);
router.use(error.server);

module.exports = router;
