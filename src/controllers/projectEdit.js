const projectDetails = require('../database/queries/projectDetails');
const projectEdit = require('../database/queries/projectEdit');

exports.get = (req, res) => {
  const { id } = req.params;
  projectDetails(id, (err, response) => {
    if (err) {
      res.render(err);
    } else {
      res.render('projectEdit', { response, css: '/css/projectEdit.css' });
    }
  });
};

exports.post = (request, response) => {
  const data = request.body;
  console.log(data);
  projectEdit(data, (err, result) => {
    if (err) {
      response.render('projectEdit');
      console.log('err', err);
    } else {
      response.redirect('/');
    }
  });
};
