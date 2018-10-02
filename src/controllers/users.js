const { addUser, checkEmail } = require('../database/queries/users');
const hashPassword = require('./hash_password');

exports.get = (req, res) => {
  res.render('add_user');
};

exports.post = (request, response, next) => {
  const data = request.body;
  const {
    name, username, email, password, idNumber, mobile, jobTitle,
  } = data;
  let { role } = data;
  (role !== 'admin') ? role = 'user' : role = 'admin';
  if (name && username && email && password && idNumber && mobile && jobTitle && role) {
    checkEmail(email)
      .then((res) => {
        if (!res.rows[0]) {
          console.log('res.rows[0].email', res.rows);
          hashPassword(password, (err, hash) => {
            if (err) {
              next(err);
            } else {
              addUser(data, hash, role)
                .then(() => { response.send({ message: 'User has been added successsfully' }); })
                .catch(() => { next(err); });
            }
          });
        } else {
          console.log('res.rows[0].email', res.rows[0].email);
          response.send({ message: 'email is already exist' });
        }
      });
  } else {
    response.send({ message: 'Some thing wrong with the data please try again' });
  }
};
