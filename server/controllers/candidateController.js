'use strict';

function candidateController() {
  let self = this;
  const mysql = require('mysql');
  const config = require('../config');
  const util = require('./utilController');
  const moment = require('moment');

  let candidate = {
    contact: [],
    experience: [],
    skills: []
  };

  self.getCandidates = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    let complexQuery = "SELECT ( SELECT COUNT(*) rows_number FROM " +
      "(SELECT first_name, email, job_title," +
      " date_publishing, status.name as status," +
      " DATEDIFF(CURRENT_DATE(), date_publishing) as date " +
      " FROM candidate JOIN status ON candidate.status_id = status.id ?  ) as rows_number ) as total, " +
      " candidate.id as id, first_name as name, last_name as lastName, job_title as position, salary as payment, " +
      " status.name as status, DATEDIFF(CURRENT_DATE(), date_publishing) as date, email as email, " +
      " image_url as image FROM candidate JOIN status on candidate.status_id = status.id ? LIMIT " +
      req.query.begin + "," + req.query.rows;

    let criteria = util.addFilterForCandidates(req.query);

    complexQuery = complexQuery.replace("\?", criteria).replace("\?", criteria);
    connection.query(complexQuery, (err, data) => {
      if (err) {
        connection.end();
        next(err);
      }
      else {
        connection.end();
        res.json(200, {
          data: data,
          status: 200,
          total: (data.length) ? data[0].total : 0,
          range: util.computeRange(req.query.rows, req.query.page, this.total)
        });
        next();
      }
    });
  };

  self.getCandidateByStatus = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "SELECT first_name as name, image_url as image, email, job_title as position FROM candidate " +
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

  self.getCandidateById = (req, res, next) => {
    let user;
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "SELECT candidate.id as id, " +
      " first_name as name, last_name as lastName, phone, address, email," +
      " job_title as position," +
      " salary as payment, status.name as status,	" +
      " DATEDIFF(CURRENT_DATE(), date_publishing) as date," +
      " DATE_FORMAT(`date_publishing`, \"%M %d %Y\") as date_publishing," +
      " image_url as image" +
      " FROM candidate " +
      "JOIN status on candidate.status_id = status.id WHERE candidate.id=" + req.params.id;

    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        next(err);
      }
      else {
        user = data[0];
        query = "SELECT id, name FROM skill WHERE candidate_id=" + req.params.id;
        connection.query(query, (err, data) => {
          if (err) {
            connection.end();
            next(err);
          }
          else {
            user.skills = data;
            query = "SELECT id, DATE_FORMAT(`start`, \"%b %Y\") as start, DATE_FORMAT(`end`, \"%b %Y\") as end, " +
              "position, location, company, description FROM experience" +
              " WHERE candidate_id=" + req.params.id;
            connection.query(query, (err, data) => {
              if (err) {
                connection.end();
                next(err);
              }
              else {
                user.experiences = data;
                connection.end();
                res.json(200, user);
                next();
              }
            });
          }
        });
      }
    });
  };

  self.updateCandidate = (req, res, next) => {
    let candidate = JSON.parse(req.body);
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "UPDATE `candidate` SET " +
      "`first_name` = '" + candidate.name + "'" +
      ", `last_name` = '" + candidate.lastName + "'" +
      ", `salary` = " + candidate.payment +
      ", `job_title` = '" + candidate.position + "'" +
      ", `phone` = '" + candidate.phone + "'" +
      ", `email` = '" + candidate.email + "'" +
      ", `address` = '" + candidate.address + "'" +
      ", `date_publishing` = CURRENT_DATE() " +
      ", `status_id`= (SELECT id FROM status WHERE status.name = '" + candidate.status + "') " +
      "  WHERE `id`=" + req.params.id;

    connection.query(query, (err, data) => {
      if (err) {
        console.log(err);
        connection.end();
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
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `experience` " +
      "(`name`, `start`, `end`, `position`, `location`, `company`, `description`, `candidate_id`)" +
      " VALUES ('" + experience.company + "', '" +  moment(experience.start).format('YYYY-MM-DD h:mm:ss') +
      "', '" +  moment(experience.end).format('YYYY-MM-DD h:mm:ss') + "', '"
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
    let review = req.body;
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `review` " +
      "(`content`, `candidate_id`, `user_id`)" +
      " VALUES ('" + review + "', '" + req.params.id + "', '" + 1 + "')";

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

  self.getReview = (req, res, next) => {
    let query = "SELECT review.id, review.content, user.first_name, user.last_name, review.date " +
      "FROM review JOIN user on user.id = review.user_id";
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
    let query = "UPDATE `experience` SET " +
      "`name`='" + experience.company + "', " +
      "`position`='" + experience.position + "', " +
      "`location`='" + experience.location + "', " +
      "`company`='" + experience.company + "', " +
      "`description`='" + experience.description + "', " +
      "`start`='" + moment(experience.start).format('YYYY-MM-DD h:mm:ss') + "', " +
      "`end`='" + moment(experience.end).format('YYYY-MM-DD h:mm:ss') + "' WHERE `id`='" + req.params.id + "'";
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

