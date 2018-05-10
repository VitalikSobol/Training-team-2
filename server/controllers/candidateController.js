'use strict';

function candidateController() {
  let self = this;
  const mysql = require('mysql');
  const config = require('../config');
  const util = require('./utilController');
  const moment = require('moment');
  const jwt = require('jsonwebtoken');


  let candidate = {
    contact: [],
    experience: [],
    skills: []
  };

  let user = {};

  self.getCandidateByStatus = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "SELECT candidate.id as id, first_name as name, image_url as image, email, job_title as position FROM candidate " +
      " JOIN status on candidate.status_id = status.id WHERE status.name = '" + req.params.name + "'";
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        next(err);
        return;
      }
      connection.end();
      res.json(200, {
        data: data,
        status: 200
      });
      next();
    });
  };


  self.getCandidates = (req, res, next) => {
    let candidates,
      statusQuery,
      vacanciesQuery;
    let connection = mysql.createConnection(config.database);
    let complexQuery = "SELECT ( SELECT COUNT(*) rows_number FROM " +
      "(SELECT first_name as name, group_concat(vacancy.position) as position, candidate.salary as payment, " +
      " status.name as status, DATEDIFF(CURRENT_DATE(), date_publishing) as date, email as email " +
      " FROM candidate JOIN status on candidate.status_id = status.id " +
      "join vacancy_has_candidate on candidate.id = candidate_id " +
      "join vacancy on vacancy.id = vacancy_has_candidate.vacancy_id " +
      "group by candidate.first_name, candidate.salary, email, date_publishing, status.name ?) as rows_number ) as total, " +
      " candidate.id as id, first_name as name, last_name as lastName, group_concat(vacancy.position) as position, candidate.salary as payment, " +
      " status.name as status, DATEDIFF(CURRENT_DATE(), date_publishing) as date, email as email, " +
      " image_url as image FROM candidate JOIN status on candidate.status_id = status.id " +
      "join vacancy_has_candidate on candidate.id = candidate_id " +
      "join vacancy on vacancy.id = vacancy_has_candidate.vacancy_id " +
      "group by total, candidate.id, candidate.first_name, candidate.last_name, candidate.salary, image_url, email, date_publishing, status.name ? ORDER BY id DESC LIMIT " +
      req.query.begin + "," + req.query.rows;

    let criteria = util.addFilterForCandidates(req.query);

    complexQuery = complexQuery.replace("\?", criteria).replace("\?", criteria);
    connection.query(complexQuery, (err, data) => {
      if (err) {
        console.log(err);
        connection.end();
        next(err);
      }
      else {
        candidates = data;
        statusQuery = 'SELECT name FROM status';
        connection.query(statusQuery, (err, data) => {
          if (err) {
            connection.end();
            next(err);
          }
          else {
            candidates.statuses = data;
            vacanciesQuery = 'SELECT position, status FROM vacancy WHERE status = 1';
            connection.query(vacanciesQuery, (err, data) => {
              if (err) {
                connection.end();
                next(err);
              }
              else {
                candidates.vacancies = data.map(function (item) {
                  return item['position'];
                });
                connection.end();
                res.json(200, {
                  candidates: candidates,
                  statuses: candidates.statuses,
                  vacancies: candidates.vacancies,
                  status: 200,
                  total: (candidates.length) ? candidates[0].total : 0,
                  range: util.computeRange(req.query.rows, req.query.page, (candidates.length) ? candidates[0].total : 0)
                });
                next();
              }
            });
          }
        });
      }
    });
  };

  let getCandidate = (id) => {
    return new Promise((resolve, reject) => {

      let query = "SELECT candidate.id as id, " +
        " first_name as name, last_name as lastName, phone, address, email," +
        " job_title as position," +
        " salary as payment, status.name as status,	" +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date," +
        " DATE_FORMAT(`date_publishing`, \"%M %d %Y\") as date_publishing," +
        " image_url as image" +
        " FROM candidate " +
        "JOIN status on candidate.status_id = status.id WHERE candidate.id=" + id;
      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log('error: ' + err);
          reject(new Error(err));
        }
        connection.end();
        user = data[0];
        resolve(data[0]);
      });
    })
  };

  let getCandidateSkills = (id) => {
    return new Promise((resolve, reject) => {

      let query = "SELECT id, name FROM skill WHERE candidate_id=" + id;

      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log('error ' + err);
          reject(new Error(err));
        }
        connection.end();
        user.skills = data;
        resolve(data);
      });
    })
  };

  let getCandidateExperience = (id) => {
    return new Promise((resolve, reject) => {

      let query = "SELECT id, DATE_FORMAT(`start`, \"%b %Y\") as start, DATE_FORMAT(`end`, \"%b %Y\") as end, " +
        "position, location, company, description FROM experience" +
        " WHERE candidate_id=" + id;

      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log('error ' + err);
          reject(new Error(err));
        }
        connection.end();
        user.experiences = data;
        resolve(data);
      });
    })
  };

  let getCandidateVacancies = (id) => {
    return new Promise((resolve, reject) => {

      let query = "SELECT position FROM vacancy_has_candidate" +
        " JOIN vacancy ON vacancy.id = vacancy_id " +
        "WHERE candidate_id = " + id;

      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log('error ' + err);
          reject(new Error(err));
        }
        let vacancies = data.map(function (item) {
          return item['position'];
        });
        connection.end();
        user.vacancies = vacancies;
        resolve(vacancies);
      });
    })
  };

  let getAllVacancies = () => {
    return new Promise((resolve, reject) => {
      let query = "SELECT position FROM vacancy " +
        "WHERE status = 1";

      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log('error: ' + err);
          reject(new Error(err));
        }
        let allVacancies = data.map(function (item) {
          return item['position'];
        });
        connection.end();
        user.allVacancies = allVacancies;
        resolve(allVacancies);
      });
    })
  };

  self.getCandidateById = (req, res, next) => {
    let candidateId = req.params.id;
    let user = {};
    getCandidate(candidateId)
      .then(
        result => {
          user = result;
          return getCandidateSkills(candidateId);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      )
      .then(
        result => {
          user.skills = result;
          return getCandidateExperience(candidateId);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      )
      .then(
        result => {
          user.experiences = result;
          return getCandidateVacancies(candidateId);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      )
      .then(
        result => {
          user.vacancies = result;
          return getAllVacancies();
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      )
      .then(
        result => {
          user.allVacancies = result;
          res.json(user);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      )

  };

  let updateCandidate = (candidate, id) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(config.database);
      connection.connect();
      let query = "UPDATE `candidate` SET " +
        "`first_name` = '" + candidate.name + "'" +
        ", `last_name` = '" + candidate.lastName + "'" +
        ", `salary` = " + candidate.payment +
        ", `phone` = '" + candidate.phone + "'" +
        ", `email` = '" + candidate.email + "'" +
        ", `address` = '" + candidate.address + "'" +
        ", `date_publishing` = CURRENT_DATE() " +
        ", `status_id`= (SELECT id FROM status WHERE status.name = '" + candidate.status + "') " +
        "  WHERE `id`=" + id;

      connection.query(query, (err, data) => {
        if (err) {
          console.log('error:' + err);
          connection.end();
          reject(new Error(err));
        }
        else {
          connection.end();
          resolve(data);
        }
      });
    })
  };

  let deleteCandidateVacancy = (id) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(config.database);
      connection.connect();
      let query = "DELETE FROM vacancy_has_candidate WHERE candidate_id = " + id;

      connection.query(query, (err, data) => {
        if (err) {
          console.log('error:' + err);
          connection.end();
          reject(new Error(err));
        }
        else {
          connection.end();
          resolve(data);
        }
      });
    })
  };

  self.updateCandidate = (req, res, next) => {
    let candidate = JSON.parse(req.body);
    candidate.address = candidate.address || '';
    candidate.phone = candidate.phone || '';
    candidate.email = candidate.email || '';
    candidate.salary = candidate.salary || '';

    let id = req.params.id;

    updateCandidate(candidate, id)
      .then(
        result => {
          console.log(result);
          return deleteCandidateVacancy(id);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      )
      .then(
        result => {
          console.log(result);
          return createTaskForInsertVacancy(candidate.vacancies, id);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      ).then(
      result => {
        Promise.all(result)
          .then(
            result => {
              console.log(result);
              res.end();
              next();
            },
            error => {
              console.log(error.message);
              res.end();
              next();
            }
          );
      },
      error => {
        console.log(error.message);
        res.end();
        next();
      }
    );
  };


  self.addCandidate = (req, res, next) => {
    let candidate = JSON.parse(req.body);
    candidate.address = candidate.address || '';
    candidate.phone = candidate.phone || '';
    candidate.email = candidate.email || '';
    candidate.salary = candidate.salary || '';

    insertCandidate(candidate)
      .then(
        result => {
          console.log(result);
          return createTaskForInsertVacancy(candidate.vacancies, result);
        },
        error => {
          console.log(error.message);
          res.end();
          next();
        }
      ).then(
      result => {
        Promise.all(result)
          .then(
            result => {
              console.log(result);
              res.end();
              next();
            },
            error => {
              console.log(error.message);
              res.end();
              next();
            }
          );
      },
      error => {
        console.log(error.message);
        res.end();
        next();
      }
    );
  };

  let insertCandidate = (candidate) => {
    return new Promise((resolve, reject) => {

      let query = "INSERT INTO `candidate` " +
        "(`first_name`, `last_name`, `email`, `status_id`)" +
        " VALUES ('" + candidate.newCandidate.name + "', '" + candidate.newCandidate.lastName +
        "', '" + candidate.newCandidate.email +
        "', (SELECT id FROM status WHERE name = '" + candidate.newCandidate.status + "'))";

      let connection = mysql.createConnection(config.database);
      connection.connect();

      connection.query(query, (err, data) => {
        if (err) {
          console.log('error:' + err);
          connection.end();
          reject(new Error(err));
        }
        connection.end();
        resolve(data.insertId);
      });
    });
  };

  let createTaskForInsertVacancy = (vacancies, candidateId) => {
    let promise = [];
    vacancies.forEach((item) => {
      promise.push(insertVacancy(item, candidateId));
    });
    return promise;
  };

  let insertVacancy = (vacancy, candidateId) => {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO vacancy_has_candidate (`candidate_id`, `vacancy_id`) " +
        "VALUES (" + candidateId + ", (SELECT id FROM vacancy WHERE position = '" + vacancy + "' and status = '1' LIMIT 1))";
      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          reject(new Error(err));
        }
        connection.end();
        resolve('success');
      });
    });
  };

  self.addSkill = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `skill` (`name`, `candidate_id`)" +
      " VALUES ('" + req.body + "', '" + req.params.id + "')";

    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      else {
        connection.end();
        res.json(200, {
          status: 200
        });
        next();
      }
    });
  };

  self.addExperience = (req, res, next) => {
    let experience = JSON.parse(req.body);
    experience.company = experience.company || '';
    experience.position = experience.position || '';
    experience.location = experience.location || '';
    experience.description = experience.description || '';

    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `experience` " +
      "(`name`, `start`, `end`, `position`, `location`, `company`, `description`, `candidate_id`)" +
      " VALUES ('" + experience.company + "', '" + moment(experience.start).format("YYYY-MM-DD HH:mm:ss") +
      "', '" + moment(experience.end).format("YYYY-MM-DD HH:mm:ss") + "', '"
      + experience.position + "', '" + experience.location + "', '" + experience.company +
      "', '" + experience.description + "', '" + req.params.id + "')";

    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      else {
        connection.end();
        res.json(200, {
          status: 200
        });
        next();
      }
    });
  };

  self.addReview = (req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ")[1];
      let data = jwt.verify(token, config.JWT_KEY);
      let review = req.body;
      let connection = mysql.createConnection(config.database);
      connection.connect();
      let query = "INSERT INTO `review` " +
        "(`content`, `candidate_id`, `user_id`)" +
        " VALUES ('" + review + "', '" + req.params.id + "', '" + data.id + "')";

      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log(err);
          next(err);
        }
        else {
          connection.end();
          res.json(200, {
            status: 200
          });
          next();
        }
      });
    } catch (error) {
      res.status(400);
      res.error = error;
      next();
    }
  };

  self.getReview = (req, res, next) => {
    let query = "SELECT review.id, review.content, user.first_name, user.last_name, review.date " +
      "FROM review JOIN user on user.id = review.user_id WHERE  review.candidate_id = "+ req.params.id;
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err) {
        console.log(err);
        connection.end();
        next(err);
      }
      else {
        connection.end();
        res.json(200, data);
        next();
      }
    });
  };

  self.getCandidatesForInterview = (req, res, next) => {
    let query = "SELECT id, first_name as name, last_name as lastName FROM candidate";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      connection.end();
      res.json(200, {
        data: data,
        status: 200
      });
      next();
    });
  };

  self.deleteSkill = (req, res, next) => {
    let query = "DELETE FROM `skill` WHERE `id`='" + req.params.id + "'";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      connection.end();
      res.json(200);
      next();
    });
  };

  self.updateSkill = (req, res, next) => {
    let skill = JSON.parse(req.body);
    let query = "UPDATE `skill` SET `name`='" + skill.name + "' WHERE `id`='" + req.params.id + "'";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      connection.end();
      res.json(200);
      next();
    });
  };

  self.deleteExperience = (req, res, next) => {
    let query = "DELETE FROM `experience` WHERE `id`='" + req.params.id + "'";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      connection.end();
      res.json(200);
      next();
    });
  };

  self.updateExperience = (req, res, next) => {
    let experience = JSON.parse(req.body);
    experience.company = experience.company || '';
    experience.position = experience.position || '';
    experience.location = experience.location || '';
    experience.description = experience.description || '';

    let query = "UPDATE `experience` SET " +
      "`name`='" + experience.company + "', " +
      "`position`='" + experience.position + "', " +
      "`location`='" + experience.location + "', " +
      "`company`='" + experience.company + "', " +
      "`description`='" + experience.description + "', " +
      "`start`='" + moment(experience.start).format("YYYY-MM-DD HH:mm:ss") + "', " +
      "`end`='" + moment(experience.end).format("YYYY-MM-DD HH:mm:ss") + "' WHERE `id`='" + req.params.id + "'";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        console.log(err);
        next(err);
      }
      connection.end();
      res.json(200);
      next();
    });
  };

}


module.exports = new candidateController();

