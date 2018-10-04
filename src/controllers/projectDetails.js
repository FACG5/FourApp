const projectDetails = require('../database/queries/projectDetails');

exports.get = (req, res) => {
  const {
    id,
  } = req.params;
  projectDetails(id, (err, response) => {
    if (err) {
      res.render(err);
    } else {
      res.render('projectDetails', {
        response, css: '/css/projectDetails.css',
      });
    }
  });
};
