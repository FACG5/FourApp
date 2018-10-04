const projectAdd = require('../database/queries/projectAdd');
const getCoordinationStatus = require('../database/queries/getcoordinationstatus');
const getProjectStatus = require('../database/queries/getprojectstatus');

exports.get = (req, res) => {
  getCoordinationStatus().then((crStatus) => {
    getProjectStatus().then((prStatus) => {
      res.render('projectAdd', {
        crStatus,
        prStatus,
        css: 'css/projectAdd.css',
      });
    }).catch();
  }).catch();
};

exports.post = (request, response) => {
  const data = request.body;
  projectAdd(data, (err, result) => {
    if (err) {
      response.render('projectAdd', {
        css: '/css/projectAdd.css',
      });
    } else {
      response.redirect('/');
    }
  });
};
