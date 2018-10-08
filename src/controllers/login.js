const bcrypt = require('bcryptjs');
const checkUser = require('../database/queries/checkUser');
const { createCookie } = require('../authentication/authentication');

exports.get = (request, response) => {
  response.render('login', {
    js: 'js/login.js',
    css: 'css/login.css',
    isadmin: request.admin,
  });
};

exports.logOut = (request, response) => {
  response.clearCookie('data');
  response.redirect('/login');
};

exports.post = (request, response) => {
  const { pass, username } = request.body;
  checkUser(username).then((result) => {
    if (result.length === 0) {
      response.render('login', { msg: 'User doesn\'t exist' });
    } else {
      bcrypt.compare(pass, result.rows[0].pass, (compareerror, compareresult) => {
        if (compareresult === false) {
          response.render('login', { msg: 'Password is Wrong', css: 'css/login.css' });
        } else {
          createCookie({
            id: result.rows[0].id,
            name: result.rows[0].name,
            role: result.rows[0].role,
          },
          (createtokenerror, token) => {
            response.setHeader(
              'Set-Cookie',
              `data=${token};httpOnly;Max-age=90000000`,
            );
            response.redirect('/');
          });
        }
      });
    }
  }).catch((err) => {
    response.render('login', { msg: err.message, css: 'css/login.css' });
  });
};
