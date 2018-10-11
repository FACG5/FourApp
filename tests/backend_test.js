const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
const runDbBuild = require('../src/database/db_build');

test('setup', (t) => {
  runDbBuild((err) => {
    if (err) t.error(err);
    t.end();
  });
});

test('home route which displays projects "GET"', (t) => {
  supertest(app).get('/')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<td>Ref No</td>'), true, 'the page should have  \'Ref No\'');
      t.equal(res.text.includes('<td>Project Name</td>'), true, 'the page should have  \'Project Name\'');
      t.equal(res.text.includes('<td>Coordination Status</td>'), true, 'the page should have  \'Coordination Status\'');
      t.equal(res.text.includes('<td>Location</td>'), true, 'the page should have  \' Location\'');
      t.equal(res.text.includes('<td>Description</td>'), true, 'the page should have  \' Description\'');
      t.equal(res.text.includes('<script src="js/fetch.js"></script>'), true, 'the page should have  \' fetch.js script\'');
      t.equal(res.text.includes('<script src="js/modal.js"></script>'), true, 'the page should have  \' modal.js script\'');
      t.equal(res.text.includes('<script src="js/projects.js"></script>'), true, 'the page should have  \' projects.js script\'');
      t.equal(res.text.includes('function handleClick'), true, 'the page should have  \'handleClick function \'');
      t.end();
    });
});

test('go to any route without authentication "GET"', (t) => {
  supertest(app).get('/')
    .expect(302)
    .expect('content-type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'Found', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 3, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('Found. Redirecting to /login'), true, 'the page should have  \' Redirecting to /login\'');
      t.end();
    });
});

test('login route which displays login card "GET"', (t) => {
  supertest(app).get('/login')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form method="POST" action="/login">'), true, 'the page should have  \'method="POST" & action="/login"\'');
      t.equal(res.text.includes('<input id="email" type="text" name="username" placeholder="Email" required style="background-color:white;"/>'), true, 'the page should have  \'Email input with name="username" & placeholder="Email" &  required\'');
      t.equal(res.text.includes('<input type="password" name="pass" id="password" placeholder="Password"'), true, 'the page should have  \'Password input with type="password"  & name="pass" & placeholder="Password" \'');
      t.equal(res.text.includes('<input type="submit" name="login" class="login login-submit" id="login" value="login">'), true, 'the page should have  \'submit button with name="login" & value="login"\'');
      t.equal(res.text.includes('<script src="js/login.js"></script>'), true, 'the page should have  \' login.js script\'');
      t.end();
    });
});

test('login route which  with post method "POST" ', (t) => {
  supertest(app).post('/login')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.headers['set-cookie'].length > 0, true, 'the page should have  \'setting cookie\'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form method="POST" action="/login">'), true, 'the page should have  \'method="POST" & action="/login"\'');
      t.equal(res.text.includes('<input id="email" type="text" name="username" placeholder="Email" required style="background-color:white;"/>'), true, 'the page should have  \'Email input with name="username" & placeholder="Email" &  required\'');
      t.equal(res.text.includes('<input type="password" name="pass" id="password" placeholder="Password"'), true, 'the page should have  \'Password input with type="password"  & name="pass" & placeholder="Password" \'');
      t.equal(res.text.includes('<input type="submit" name="login" class="login login-submit" id="login" value="login">'), true, 'the page should have  \'submit button with name="login" & value="login"\'');
      t.equal(res.text.includes('<script src="/js/modal.js"></script> '), true, 'the page should have  \' modal.js script\'');
      t.end();
    });
});

test('add user route which displays user add page just for the admin "GET" ', (t) => {
  supertest(app).get('/add_user')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form class="adduser" action="/add_user" method="post">'), true, 'the page should have  \'method="POST" & action="/add_user"\'');
      t.equal(res.text.includes('<input type="text" name="username" value="" required>'), true, 'the page should have  \'User name input with name="username" & required\'');
      t.equal(res.text.includes('<input type="email" name="email" value="" required>'), true, 'the page should have  \'Email input with type="email" & name="email" & required\'');
      t.equal(res.text.includes('<input type="password" name="password" value="" required>'), true, 'the page should have  \'Password input with type="password" & name="password" & required\'');
      t.equal(res.text.includes('<input type="number" name="mobile" value="" required>'), true, 'the page should have  \'Mobile input with type="number" & name="mobile" & required\'');
      t.equal(res.text.includes('<input type="number" name="idNumber" value="" required>'), true, 'the page should have  \'ID Num input with type="number" & name="idNumber" & required\'');
      t.equal(res.text.includes('<input type="text" name="jobTitle" value="" required>'), true, 'the page should have  \'Job title input with type="text" & name="jobTitle" & required\'');
      t.equal(res.text.includes('<select class="" name="role">'), true, 'the page should have  \'Select option with name="role"\'');
      t.equal(res.text.includes('<option value="admin">Admin</option>'), true, 'the page should have  \'Option "admin"\'');
      t.equal(res.text.includes('<option value="user" selected>User</option>'), true, 'the page should have  \'Option "user" & is selected by default\'');
      t.end();
    });
});

test('add user route which add new user to the database "POST" ', (t) => {
  supertest(app).post('/add_user')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form class="adduser" action="/add_user" method="post">'), true, 'the page should have  \'method="POST" & action="/add_user"\'');
      t.equal(res.text.includes('<input type="text" name="username" value="" required>'), true, 'the page should have  \'User name input with name="username" & required\'');
      t.equal(res.text.includes('<input type="email" name="email" value="" required>'), true, 'the page should have  \'Email input with type="email" & name="email" & required\'');
      t.equal(res.text.includes('<input type="password" name="password" value="" required>'), true, 'the page should have  \'Password input with type="password" & name="password" & required\'');
      t.equal(res.text.includes('<input type="number" name="mobile" value="" required>'), true, 'the page should have  \'Mobile input with type="number" & name="mobile" & required\'');
      t.equal(res.text.includes('<input type="number" name="idNumber" value="" required>'), true, 'the page should have  \'ID Num input with type="number" & name="idNumber" & required\'');
      t.equal(res.text.includes('<input type="text" name="jobTitle" value="" required>'), true, 'the page should have  \'Job title input with type="text" & name="jobTitle" & required\'');
      t.equal(res.text.includes('<select class="" name="role">'), true, 'the page should have  \'Select option with name="role"\'');
      t.equal(res.text.includes('<option value="admin">Admin</option>'), true, 'the page should have  \'Option "admin"\'');
      t.equal(res.text.includes('<option value="user" selected>User</option>'), true, 'the page should have  \'Option "user" & is selected by default\'');
      t.end();
    });
});

test('view_users  route which display  users  "GET"', (t) => {
  supertest(app).get('/view_users')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<a href="/add_user"><input class="addButton" id="addButton"type="submit" href="/add_user" value="New user"></a>'), true, 'the page should have  \'New user button which redirects user to add_user page\'');
      t.equal(res.text.includes('<table>', '<thead>', '<tr>', '<td>'), true, 'the page should have  \'table to displays users \'');
      t.equal(res.text.includes('<input type="checkbox"  onclick="checkRole(this.checked,'), true, 'the page should have  \'checkbox which user can change role from admin to user or vice versa\'');
      t.equal(res.text.includes('<img src="/images/rubbish-bin.png"  onclick="deleteRow('), true, 'the page should have  \'Delete icon which user can delete user row\'');
      t.equal(res.text.includes('<script src="/js/modal.js"></script> '), true, 'the page should have  \'modal.js script\'');
      t.equal(res.text.includes('<script src="/js/helpers.js"></script>'), true, 'the page should have  \'helpers.js script\'');
      t.equal(res.text.includes('<script src="/js/authorization.js"></script>'), true, 'the page should have  \'authorization.js\'');
      t.end();
    });
});

test('view_users  route when the user press role chane checkbox  "POST"', (t) => {
  supertest(app).post('/view_users')
    .send({ process: 0 })
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('{"message":"Authorization changes have been done"}'), true, 'the page should have  \'message "Authorization changes have been done"\'');
      t.end();
    });
});

test('view_users  route when the user press delete icone  "POST"', (t) => {
  supertest(app).post('/view_users')
    .send({ process: 1 })
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('{"message":"Row deleted successsfully"}'), true, 'the page should have  \'message "Row deleted successsfully"\'');
      t.end();
    });
});

test('projectDetails  route which display  projects Details "GET" ', (t) => {
  supertest(app).get('/projectDetails/1')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<a href="/view_users">Control Panel</a>'), true, 'the page should have  \'Control Panel link\'');
      t.equal(res.text.includes('<a href="/logout">Logout</a>'), true, 'the page should have  \'logout link\'');
      t.equal(res.text.includes('<h1 class="page-title">Project Details: (GP-10074)</h1> '), true, 'the page should have  \'Project Details: with ref Number\'');
      t.equal(res.text.includes('<p>CLA Ref Number</p>'), true, 'the page should have  \'CLA Ref number\'');
      t.equal(res.text.includes('<script src="/js/modal.js"></script> '), true, 'the page should have  \'modal.js script\'');
      t.equal(res.text.includes('<a class="detailsButton" href="/">Back</a>'), true, 'the page should have  \'Back button that redirect user to projects page\'');
      t.end();
    });
});

test('projectedit  route which display  projects Details to change feilds "GET" ', (t) => {
  supertest(app).get('/projectedit/1')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<a href="/view_users">Control Panel</a>'), true, 'the page should have  \'Control Panel link\'');
      t.equal(res.text.includes('<a href="/logout">Logout</a>'), true, 'the page should have  \'logout link\'');
      t.equal(res.text.includes('<h1 class="page-title">Project Edit: (GP-10074)</h1>'), true, 'the page should have  \'Project Details: with ref Number\'');
      t.equal(res.text.includes('<form  id="project_form" action="/projectEdit" method="POST">'), true, 'the page should have  \'Form with method="POST" & action="/projectedit"\'');
      t.equal(res.text.includes('<script src="/js/modal.js"></script> '), true, 'the page should have  \'modal.js script\'');
      t.equal(res.text.includes('<button class="editButton" name="projectedit" value="submit" type="submit"> SUBMIT </button>'), true, 'the page should have  \'Submit button that post data\'');
      t.equal(res.text.includes('<a class="editButton" href="/"> Back </a>'), true, 'the page should have  \'Back button that redirect user to projects page\'');
      t.end();
    });
});

test('projectedit  route which post  edits to database "POST" ', (t) => {
  supertest(app).post('/projectedit')
    .expect(302)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'Found', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 3, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('Found. Redirecting to /'), true, 'the page should have  \'Redirecting to /\'');
      t.end();
    });
});

test('getprojects route which get  projects based into the filter with no data "POST"', (t) => {
  supertest(app).post('/getprojects')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('{"err":{"name":"error","length":110,"severity":"ERROR","code":"42703","position":"302","file":"parse_relation.c","line":"3293","routine":"errorMissingColumn"}}'), true, 'the page should have  \'Return Error\'');
      t.end();
    });
});
test('getprojects route which get  projects based into the filter with no data "POST"', (t) => {
  supertest(app).post('/getprojects')
    .send({
      refno: '',
      projectname: '',
      sector: '',
      coordinationstatusid: 2,
      location: '',
    })
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('{"err":null,"result":[{"id":2,"sn":"11","cla_ref":"GP-11111","project_no":"G.3.2","project_name":"IDB Agriculture (Wells & Ponds)","sector":"Agriculture"'), true, 'the page should have  \'return result from search\'');
      t.end();
    });
});

test('projectadd  route to add new project to the database "GET" ', (t) => {
  supertest(app).get('/projectadd')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form  id="project_form" action="/projectadd" method="POST">'), true, 'the page should have  \'method="POST" & action="/projectadd"\'');
      t.equal(res.text.includes('<button class="addButton" name="projectAdd" value="submit" type="submit"> SUBMIT </button>'), true, 'the page should have  \'Submit button with name="projectAdd" & type="submit"\'');
      t.end();
    });
});

test('projectadd  route to add new project to the database "POST" ', (t) => {
  supertest(app).post('/projectadd')
    .expect(200)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form  id="project_form" action="/projectadd" method="POST">'), true, 'the page should have  \'method="POST" & action="/projectadd"\'');
      t.equal(res.text.includes('<button class="addButton" name="projectAdd" value="submit" type="submit"> SUBMIT </button>'), true, 'the page should have  \'Submit button with name="projectAdd" & type="submit"\'');
      t.end();
    });
});

test('/deleteproject/  route to delete  project row from the database "POST" ', (t) => {
  supertest(app).get('/deleteproject/1')
    .expect(302)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'Found', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 3, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('Found. Redirecting to /'), true, 'the page should have  \'Redirecting to /\'');
      t.end();
    });
});

test('/logOut/  route to delete  cookie and redirect user to login page "GET" ', (t) => {
  supertest(app).get('/logout')
    .expect(302)
    .set('Cookie', ['data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IlNhbHdhIEVsa2hvdWRhcnkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MzkwMDUxODh9.b8A0uBSXUH8nJkfi5r25glUB0K7RNjYqxZEZwPaN_AU'])
    .expect('content-type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent, true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended, true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'Found', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 3, 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length, 0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('Found. Redirecting to /'), true, 'the page should have  \'Redirecting to /\'');
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
