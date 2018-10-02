
const getProjects = require('../database/queries/getProjects');
const getCoordinationStatus = require('../database/queries/getcoordinationstatus');

exports.get = (request, response) => {
  getCoordinationStatus().then((getCoordinationStatusResults) => {
    response.render('projects', {
      coordinationstatus: getCoordinationStatusResults.rows,
      css: 'css/projects.css',
      js: 'js/fetch.js',
      css2: 'css/modal.css',
      js2: 'js/modal.js',
      js3: 'js/projects.js',
    });
  }).catch();
};


exports.getprojects = (request, response) => {
  let params = '';
  request.on('data', (chunk) => {
    params += chunk;
  });
  request.on('end', () => {
    const data = JSON.parse(params);
    getProjects(data).then((responseults) => {
      response.json({ err: null, result: responseults.rows });
    }).catch((err) => {
      console.log(err);
      response.json({ err });
    });
  });
};
