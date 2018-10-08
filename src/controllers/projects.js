
const getProjects = require('../database/queries/getProjects');
const getCoordinationStatus = require('../database/queries/getcoordinationstatus');
const getAllProjects = require('../database/queries/getallprojects');
const deleteProjectQuery = require('../database/queries/deleteproject');

const get = (request, response) => {
  getCoordinationStatus().then((getCoordinationStatusResults) => {
    getAllProjects().then((getAllProjectsResults) => {
      response.render('projects', {
        allprojects: getAllProjectsResults.rows,
        coordinationstatus: getCoordinationStatusResults.rows,
        isadmin: request.admin,
        css: 'css/projects.css',
        js: 'js/fetch.js',
        css2: 'css/modal.css',
        js2: 'js/modal.js',
        js3: 'js/projects.js',
      });
    }).catch();
  }).catch();
};

const getprojects = (request, response) => {
  getProjects(request.body).then((responseults) => {
    response.json({ err: null, result: responseults.rows });
  }).catch((err) => {
    response.json({ err });
  });
};


const deleteProject = (req, res) => {
  deleteProjectQuery(req.params.id).then(
    () => { res.redirect('/'); },
  ).catch();
};

module.exports = { get, getprojects, deleteProject };
