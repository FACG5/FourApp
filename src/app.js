const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./controllers');
const helpers = require('./views/helpers/index');
const { authCheck } = require('./authentication/authentication');

const app = express();
app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

app.use((req, res, next) => {
  authCheck(req, (authErr, token) => {
    if (authErr) {
      req.token = null;
      req.userauthed = false;
      next();
    } else {
      req.token = token;
      req.userauthed = true;
      next();
    }
  });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.disable('x-powered-by');
app.engine('hbs', handlebars({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
  helpers,
}));


app.use(router);

module.exports = app;
