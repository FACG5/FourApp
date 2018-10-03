
exports.get = (req, res) => {
  res.clearCookie('data');
  res.redirect('/');
};
