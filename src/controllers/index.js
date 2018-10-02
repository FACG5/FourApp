const express = require('express');
const cookieParser = require('cookie-parser');
const error = require('./error');
const home = require('./home');
const addUser = require('./users');

const router = express.Router();
router.use(cookieParser())
router.get('/', home.get);
router.get('/add_user', addUser.get);
router.post('/add_user', addUser.post);
router.use(error.client);
router.use(error.server);

module.exports = router;
