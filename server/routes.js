'use strict';
const restify = require('restify');

module.exports = function (server) {
  let vacancy = require('./controllers/vacancyController');
  let candidate = require('./controllers/candidateController');
  let resources = require('./controllers/resourceController');
  let login = require('./controllers/loginController');
  let events = require('./controllers/eventController');
  let users = require('./controllers/userController');
  let password = require('./controllers/passwordController');
  let authorization = require('./filter/authorization');

  server.get("/api/vacancies", vacancy.getVacancies);
  server.post("/api/vacancies", vacancy.addVacancies);
  server.post("/api/login", login.login);
  server.post("/api/registration", login.registration);

  server.post("/api/email", password.sendInstruction);
  server.get("/api/password/:token", password.checkToken);
  server.post("/api/password", password.setPassword);

  server.get("/api/events", events.getEvents);
  server.get("/api/events/:id", events.getEventById);
  server.put("/api/events/:id", events.updateEventById);
  server.post("/api/events", events.createEvent);

  server.get("/api/interviewee", candidate.getCandidatesForInterview);
  server.get("/api/interviewers", users.getAll);

  server.get("/api/notification", events.getNotification);

  // server.get(/\/views\/?.*/, resources.loadResource);
  // server.get('/', login.getLoginPage);

  server.get("/api/candidates/status/:name", candidate.getCandidateByStatus);
  server.get("/api/candidates", candidate.getCandidates);
  server.get("/api/candidates/:id", candidate.getCandidateById);
  server.get("/api/candidates/review/:id", candidate.getReview);
  server.put("/api/candidates/:id", candidate.updateCandidate);
  server.post("/api/candidates", candidate.addCandidate);
  server.post("/api/candidates/skill/:id", candidate.addSkill);
  server.post("/api/candidates/experience/:id", candidate.addExperience);
  server.post("/api/candidates/review/:id", candidate.addReview);

  server.get("/api/user", users.getUser);
  server.put("/api/user/:id", users.updateUser);

  server.get('/\\/(.*)?.*/', restify.plugins.serveStatic({
    directory: `${__dirname}/../dist`,
    default: './index.html',
    maxAge: 0
  }));

};
