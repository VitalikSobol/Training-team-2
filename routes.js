'use strict';
module.exports = function(server) {
  let vacancy = require('./controllers/vacancyController');
  let candidate = require('./controllers/candidateController');
	let resources = require('./controllers/resourceController');
	let login = require('./controllers/loginController');

  server.get("/vacancies", vacancy.getVacancies);

  server.get("/candidates", candidate.getCandidates);
	server.get(/\/views\/?.*/,resources.loadResource);
	server.get('/', login.getLoginPage);
  server.get("/candidates/:id", candidate.getCandidateById);
  server.put("/candidates/:id", candidate.updateCandidate);
  server.post("/candidates/skill/:id", candidate.addSkill);
  server.post("/candidates/experience/:id", candidate.addExperience);

};