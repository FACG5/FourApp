
const checkRole = (checked, userName) => {
  isChecked(checked).then((role) => {
    const data = { role, userName, process: 0 };
    optionAlert('Are you sure you want to change authorizations!').then(() => {
      fetch('/view_users', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      }).then(response => response.json()).then((response) => {
        const { message } = response;
        alert(message);
      }).catch(error => alert('ERROR !', error));
    }).catch(() => { alert('You cancel changes'); });
  }).catch(() => { alert('ERROR !'); });
};

const deleteRow = (userName) => {
  const data = { userName, process: 1 };
  optionAlert('Are you sure you want to delete!').then(() => {
    fetch('/view_users', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    }).then(response => response.json()).then((response) => {
      window.location = '/view_users';
      const { message } = response;
      alert(message)
    }).catch(error => alert('ERROR !', error));
  }).catch(() => { alert('delete cancel'); });
};
