exports.authorize = (req, res, next) => {
  if (req.userauthed) {
    next();
  } else {
    res.redirect('/login');
  }
};
