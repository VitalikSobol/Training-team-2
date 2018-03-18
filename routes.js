'use strict';
module.exports = function(server) {
  let vacancy = require('./controllers/vacancyController');
  let candidate = require('./controllers/candidateController');
	let resources = require('./controllers/resourceController');
	let login = require('./controllers/loginController');
	let events = require('./controllers/eventController');
	
	server.get("/events", events.getEvents);
  server.get("/vacancies", vacancy.getVacancies);
	server.post("/events", events.createEvent);
	
  server.get("/candidates", candidate.getCandidates);
	server.get(/\/views\/?.*/,resources.loadResource);
	server.get('/', login.getLoginPage);
  server.get("/candidates/:id", candidate.getCandidateById);
  server.put("/candidates/:id", candidate.updateCandidate);
  server.post("/candidates/skill/:id", candidate.addSkill);
  server.post("/candidates/experience/:id", candidate.addExperience);
  server.post("/candidates/review/:id", candidate.addReview);
  server.get("/candidates/review/:id", candidate.getReview);

};