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
  server.del("/api/vacancies/:id", vacancy.deleteVacancy);
  server.put("/api/vacancies/:id",vacancy.updateVacancy);

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
  server.get("/api/interviewers", users.getAllInterviewers);

  server.get("/api/notification", events.getNotification);

  server.get("/api/candidates/status/:name", candidate.getCandidateByStatus);
  server.get("/api/candidates", candidate.getCandidates);
  server.get("/api/candidates/:id", candidate.getCandidateById);
  server.get("/api/candidates/review/:id", candidate.getReview);
  server.put("/api/candidates/:id", candidate.updateCandidate);
  server.post("/api/candidates", candidate.addCandidate);
  server.post("/api/candidates/skill/:id", candidate.addSkill);
  server.del("/api/candidates/skill/:id", candidate.deleteSkill);
  server.put("/api/candidates/skill/:id", candidate.updateSkill);
  server.post("/api/candidates/experience/:id", candidate.addExperience);
  server.del("/api/candidates/experience/:id", candidate.deleteExperience);
  server.put("/api/candidates/experience/:id", candidate.updateExperience);
  server.post("/api/candidates/review/:id", candidate.addReview);

  server.get("/api/user", users.getUser);
  server.put("/api/user/:id", users.updateUser);

  function getAssets(){
    return restify.plugins.serveStatic({
      directory: `${__dirname}/../dist`,
      default: 'index.html'
    });
  }

  server.get('.*\.js', getAssets());
  server.get('.*\.js\.map', getAssets());
  server.get('.*\.png', getAssets());
  server.get('.*\.woff', getAssets());
  server.get('.*\.eot', getAssets());
  server.get('.*\.ttf', getAssets());
  server.get('.*\.woff2', getAssets());
  server.get('.*\.ico', getAssets());

  server.get('/\\/(.*)?.*/', restify.plugins.serveStatic({
    directory: `${__dirname}/../dist`,
    file: './index.html',
    maxAge: 0
  }));

};
