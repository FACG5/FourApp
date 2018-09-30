const express = require('express');
const cookieParser = require('cookie-parser');
const error = require('./error');
const home = require('./home');

const router = express.Router();
router.use(cookieParser())
router.get('/', home.get);
router.use(error.client);
router.use(error.server);

module.exports = router;
