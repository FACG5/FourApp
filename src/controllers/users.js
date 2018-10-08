const {
  addUser,
  checkUser,
  checkId,
  viewUsers,
  updateRole,
  deleteUser,
  checkMobile,
} = require('../database/queries/users');
const hashPassword = require('../authentication/hashpassword');

exports.userIndex = (req, res) => {
  viewUsers().then((result) => {
    const userDetails = result.rows;
    res.render('view_users', {
      addUserSuccessMsg: req.flash('addUserSuccessMsg'),
      userDetails,
      auth: 'authorization',
      func: 'helpers',
    });
  }).catch((err) => {
    next(err);
  });
};

exports.authorization = (req, res, next) => {
  const data = req.body;
  if (data.process === 0) {
    updateRole(data).then(() => {
      res.send({
        message: 'Authorization changes have been done',
      });
    }).catch((err) => {
      next(err);
    });
  } else if (data.process === 1) {
    deleteUser(data.userName).then(() => {
      res.send({
        message: 'Row deleted successsfully',
      });
    }).catch((err) => {
      next(err);
    });
  }
};

exports.get = (req, res) => {
  res.render('add_user');
};

exports.post = (request, response, next) => {
  const data = request.body;
  const {
    name,
    username,
    email,
    password,
    idNumber,
    mobile,
    jobTitle,
  } = data;
  let {
    role,
  } = data;
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
                checkMobile(mobile).then((mobileResult) => {
                  if (!mobileResult.rows[0]) {
                    addUser(data, hash, role)
                      .then(() => {
                        request.flash('addUserSuccessMsg', 'User Added successfully!');
                        response.redirect('/view_users');
                      }).catch((err) => {
                        next(err);
                      });
                  } else {
                    response.render('add_user', {
                      message: 'Mobile Number is already exist',
                    });
                  }
                }).catch((err) => {
                  next(err);
                });
              } else {
                response.render('add_user', {
                  message: 'ID Number is already exist',
                });
              }
            }).catch((err) => {
              next(err);
            });
          } else {
            response.render('add_user', {
              message: 'Username is already exist',
            });
          }
        }).catch((err) => {
          next(err);
        });
      }
    });
  } else {
    response.render('add_user', {
      message: 'Some thing wrong with the data please try again',
    });
  }
};
