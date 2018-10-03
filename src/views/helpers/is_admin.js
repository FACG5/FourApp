module.exports = (role) => {
  if (role === 'admin') {
    return true;
  }
  return false;
};
