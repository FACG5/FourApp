const isChecked = (checked) => {
  let role = '';
  if (checked) {
    role = 'admin';
  } else {
    role = 'user';
  }
  return Promise.resolve(role);
};

const optionAlert = (message) => {
  if (confirm(message)) {
    return Promise.resolve();
  }
  return Promise.reject();
}
