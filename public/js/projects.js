const refnotxt = document.getElementById('refnotxt');
const projectnametxt = document.getElementById('projectnametxt');
const sectortxt = document.getElementById('sectortxt');
const statusselect = document.getElementById('statusselect');
const locationtxt = document.getElementById('locationtxt');
const projectstablebody = document.getElementById('projectstablebody');
const modalconfirmdelete = document.getElementsByClassName('confirmdelete')[0];

function getFilteredProjects(cb) {
  const filterparams = {
    refno: refnotxt.value,
    projectname: projectnametxt.value,
    sector: sectortxt.value,
    coordinationstatusid: statusselect.value,
    location: locationtxt.value,
  };
  request('POST', '/getprojects', filterparams, cb);
}

function renderFitchedProjects(projects) {
  projectstablebody.innerHTML = '';
  if (projects instanceof Array) {
    if (projects.length !== 0) {
      projects.forEach((elem) => {
        const tr = document.createElement('tr');
        tr.dataset.id = elem.id;

        const refnotd = document.createElement('td');
        refnotd.textContent = elem.cla_ref;
        tr.appendChild(refnotd);

        const projectnametd = document.createElement('td');
        projectnametd.textContent = elem.project_name;
        tr.appendChild(projectnametd);

        const sectortd = document.createElement('td');
        sectortd.textContent = elem.sector;
        tr.appendChild(sectortd);

        const approvalstatustd = document.createElement('td');
        approvalstatustd.textContent = elem.coordinationstatus;
        tr.appendChild(approvalstatustd);

        const locationtd = document.createElement('td');
        locationtd.textContent = elem.project_location;
        tr.appendChild(locationtd);

        const descriptiontd = document.createElement('td');
        descriptiontd.textContent = elem.description;
        tr.appendChild(descriptiontd);

        const buttonstd = document.createElement('td');
        buttonstd.innerHTML = `<a href="/projectdetails/${elem.id}"><img src="images/information-signal.png" alt="" /></a>`
           + `<a href="/projectedit/${elem.id}"><img src="images/writing.png" alt="" /></a>`
           + `<a href="#" class="deletebtn"><img src="images/dustbin(1).png" alt="" /></a>`;
        buttonstd.lastChild.onclick = (e) => {
          modalconfirmdelete.setAttribute('href', `/deleteproject/${e.currentTarget.parentElement.parentElement.dataset.id}`);
          modal.style.display = 'block';
        };
        tr.appendChild(buttonstd);
        projectstablebody.appendChild(tr);
      });
    }
  }
}

refnotxt.onkeyup = () => {
  getFilteredProjects((error, results) => {
    if (!error) { renderFitchedProjects(results); }
  });
};

projectnametxt.onkeyup = () => {
  getFilteredProjects((error, results) => {
    if (!error) { renderFitchedProjects(results); }
  });
};
sectortxt.onkeyup = () => {
  getFilteredProjects((error, results) => {
    if (!error) { renderFitchedProjects(results); }
  });
};

statusselect.onchange = () => {
  getFilteredProjects((error, results) => {
    if (!error) { renderFitchedProjects(results); }
  });
};
locationtxt.onkeyup = () => {
  getFilteredProjects((error, results) => {
    if (!error) { renderFitchedProjects(results); }
  });
};
