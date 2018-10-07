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

test('home route which display projects', (t) => {
  supertest(app).get('/')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .expect('statusMessage','OK')
    .end((err, res) => {
      console.log('in the test>>>>>>>>>>>>>>>>>>>>>>>>>',res);
      if (err) t.error(err);
      t.equal(res.text.includes('Ref No'), true, 'the page should have  \'Ref No\'');
      t.equal(res.text.includes('Ref No'), true, 'the page should have  \'Project Name\'');
      t.equal(res.text.includes('Ref No'), true, 'the page should have  \'Coordination Status\'');
      // t.equal(res.text.includes('Ref No'), true, 'the page should have  \'Coordination Status\'');

      t.end();
    });
});

// test.onFinish(() => {
//   process.exit(0);
// });
