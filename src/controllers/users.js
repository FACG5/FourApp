const { addUser, checkUser, checkId } = require('../database/queries/users');
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
    hashPassword(password, (err, hash) => {
      if (err) {
        next(err);
      } else {
        checkUser(username).then((res) => {
          if (!res.rows[0]) {
            checkId(idNumber).then((result) => {
              if (!result.rows[0]) {
                addUser(data, hash, role)
                  .then(() => {
                    response.send({ message: 'User has been added successsfully' });
                  }).catch((err) => { next(err); });
              } else {
                response.send({ message: 'ID Number is already exist' });
              }
            }).catch((err) => { next(err); });
          } else {
            response.send({ message: 'Username is already exist' });
          }
        }).catch((err) => { next(err); });
      }
    });
  } else {
    response.send({ message: 'Some thing wrong with the data please try again' });
  }
};
