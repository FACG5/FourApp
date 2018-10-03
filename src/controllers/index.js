const express = require('express');
const cookieParser = require('cookie-parser');
const error = require('./error');
const home = require('./home');
const user = require('./users');

const router = express.Router();
router.use(cookieParser())
router.get('/', home.get);
router.get('/add_user', user.get);
router.post('/add_user', user.post);
router.get('/view_users', user.userIndex);
router.post('/view_users', user.authorization);
router.use(error.client);
router.use(error.server);

module.exports = router;
