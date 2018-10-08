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
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2 , 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length,0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol,'http:', 'the page should have  \'http protocol \'');
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
      t.equal(res.res.statusMessage, 'OK', 'the page should have  \'OK status message\'');
      t.equal(res.charset, 'utf-8', 'the page should have  \'utf-8 charset \'');
      t.equal(res.statusType, 2 , 'the page should have  \'statusType 2 \'');
      t.equal(res.redirects.length,0, 'the page should have  \'no redirects \'');
      t.equal(res.request.protocol, 'http:', 'the page should have  \'http protocol \'');
      t.equal(res.text.includes('<form method="POST" action="/login">'), true, 'the page should have  \'method="POST" & action="/login"\'');
      t.equal(res.text.includes('<input id="email" type="text" name="username" placeholder="Email" required/>'), true, 'the page should have  \'Email input with name="username" & placeholder="Email" &  required\'');
      t.equal(res.text.includes('<input type="password" name="pass" id="password" placeholder="Password"'), true, 'the page should have  \'Password input with type="password"  & name="pass" & placeholder="Password" \'');
      t.equal(res.text.includes('<input type="submit" name="login" class="login login-submit" id="login" value="login">'), true, 'the page should have  \'submit button with name="login" & value="login"\'');
      t.equal(res.text.includes('<script src="js/login.js"></script>'), true, 'the page should contain  \' login.js script\'');
      t.end();
    });
});

test('add user route which displays  user add page just for the admin  ', (t) => {
  supertest(app).get('/add_user')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(res);
      if (err) t.error(err);

      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
