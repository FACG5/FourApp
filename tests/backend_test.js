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

test('home route which displays projects', (t) => {
  supertest(app).get('/')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent,true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended,true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2 , 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length,0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol,'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<td>Ref No</td>'), true, 'the page should have  \'Ref No\'');
      t.equal(res.text.includes('<td>Project Name</td>'), true, 'the page should have  \'Project Name\'');
      t.equal(res.text.includes('<td>Coordination Status</td>'), true, 'the page should have  \'Coordination Status\'');
      t.equal(res.text.includes('<td>Location</td>'), true, 'the page should have  \' Location\'');
      t.equal(res.text.includes('<td>Description</td>'), true, 'the page should have  \' Description\'');
      t.equal(res.text.includes('<script src="js/fetch.js"></script>'), true, 'the page should contain  \' fetch.js script\'');
      t.equal(res.text.includes('<script src="js/modal.js"></script>'), true, 'the page should contain  \' modal.js script\'');
      t.equal(res.text.includes('<script src="js/projects.js"></script>'), true, 'the page should contain  \' projects.js script\'');
      t.equal(res.text.includes('function handleClick'), true, 'the page should contain  \'handleClick function \'');
      t.end();
    });
});

test('login route which displays login card ', (t) => {
  supertest(app).get('/login')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent,true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended,true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2 , 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length,0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form method="POST" action="/login">'), true, 'the page should have  \'method="POST" & action="/login"\'');
      t.equal(res.text.includes('<input id="email" type="text" name="username" placeholder="Email" required/>'), true, 'the page should have  \'Email input with name="username" & placeholder="Email" &  required\'');
      t.equal(res.text.includes('<input type="password" name="pass" id="password" placeholder="Password"'), true, 'the page should have  \'Password input with type="password"  & name="pass" & placeholder="Password" \'');
      t.equal(res.text.includes('<input type="submit" name="login" class="login login-submit" id="login" value="login">'), true, 'the page should have  \'submit button with name="login" & value="login"\'');
      t.equal(res.text.includes('<script src="js/login.js"></script>'), true, 'the page should contain  \' login.js script\'');
      t.end();
    });
});

test('login route which  with post method ', (t) => {
  supertest(app).post('/login')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log('result',res.res.socket._httpMessage._headerSent);
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent,true, 'the page should have  \'header sent \'');
      t.equal(res.headers['set-cookie'].length>0,true, 'the page should have  \'setting cookie\'');
      t.equal(res.res.socket._writableState.ended,true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.socket._httpMessage._headerSent,true, 'the page should have  \'header sent \'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2 , 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length,0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.end();
    });
});

test('add user route which displays user add page just for the admin  ', (t) => {
  supertest(app).get('/add_user')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.socket._httpMessage._headerSent,true, 'the page should have  \'header sent \'');
      t.equal(res.res.socket._writableState.ended,true, 'the page should have  \'ended writable state\'');
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2 , 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length,0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.headers.connection, 'close', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form class="" action="/add_user" method="post">'), true, 'the page should have  \'method="POST" & action="/add_user"\'');
      t.equal(res.text.includes('<input type="text" name="username" value="" required>'), true, 'the page should have  \'User name input with name="username" & required\'');
      t.equal(res.text.includes('<input type="email" name="email" value="" required>'), true, 'the page should have  \'Email input with type="email" & name="email" & required\'');
      t.equal(res.text.includes('<input type="password" name="password" value="" required>'), true, 'the page should have  \'Password input with type="password" & name="password" & required\'');
      t.equal(res.text.includes('<input type="number" name="mobile" value="" required>'), true, 'the page should have  \'Mobile input with type="number" & name="mobile" & required\'');
      t.equal(res.text.includes('<input type="number" name="idNumber" value="" required>'), true, 'the page should have  \'ID Num input with type="number" & name="idNumber" & required\'');
      t.equal(res.text.includes('<input type="text" name="jobTitle" value="" required>'), true, 'the page should have  \'Job title input with type="text" & name="jobTitle" & required\'');
      t.equal(res.text.includes('<input type="checkbox"  name="role" value="admin" >'), true, 'the page should have  \'Admin checkbox with name="role" & value="admin"\'');
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
