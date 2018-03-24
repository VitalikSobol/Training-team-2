'use strict';
function candidateController() {
  const mysql = require('mysql');
  const config = require('../config');
  const connection = mysql.createConnection(config.database);

  let entity = {
    data: [],
    status: 0,
    total: 0,
    range: ""
  };


  let candidate = {
    status: 0,
    contact: [],
    experience: [],
    skills: []
  };

  this.getCandidates = function (req, res) {
    let defaultFilter = "name=none&email=none&position=none&date=none&status=none";
    
    if(req.query.filter === defaultFilter) {

      let candidatesQuery = "SELECT (SELECT COUNT(*) FROM candidate) as total,candidate.id as id, first_name as name," +
        " last_name as lastName, job_title as position, salary as payment, status.name as status," +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date," +
        " image_url as image," +
        " email as email"  +
        " FROM candidate JOIN status on candidate.status_id = status.id LIMIT " + req.query.begin + "," + req.query.rows;

      connection.query(candidatesQuery, function (err, data) {
        if (err) throw err;
        else {
          entity.data = data;
          entity.status = 200;
          entity.total = data[0].total || 0;
          entity.range = computeRange(req.query.rows, req.query.page, entity.total);
          res.json(entity);
        }
      });

    }
    else {
      
      let complexQuery = "SELECT ( SELECT COUNT(*) rows_number FROM "+
        "(SELECT first_name, email, job_title," +
        " date_publishing, status.name as status," +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date "+
        " FROM candidate JOIN status ON candidate.status_id = status.id ?  ) as rows_number ) as total, " +
        " candidate.id as id, first_name as name, last_name as lastName, job_title as position, salary as payment, " +
        " status.name as status, DATEDIFF(CURRENT_DATE(), date_publishing) as date, email as email, " +
        " image_url as image FROM candidate JOIN status on candidate.status_id = status.id ? LIMIT " +
        req.query.begin + "," + req.query.rows;
     
      let criteria = addFilter(req.query.filter);
     
      complexQuery = complexQuery.replace("\?", criteria).replace("\?", criteria);
      connection.query(complexQuery, function (err, data) {
        if (err) throw err;
        else {
          if (data.length === 0) {
            entity.data = [];
            entity.status = 200;
            entity.total = 0;
            entity.range = computeRange(req.query.rows, req.query.page, entity.total);
            res.json(entity);
          } else {
            entity.data = data;
            entity.status = 200;
            entity.total = data[0].total || 0;
            entity.range = computeRange(req.query.rows, req.query.page, entity.total);
            res.json(entity);
          }
        }
      });
    }
  };

  this.getCandidateByStatus = function(req, res, next){
    let query  = "SELECT first_name as name, image_url as image, email, job_title as position FROM candidate " +
        " JOIN status on candidate.status_id = status.id WHERE status.name = '" + req.params.name + "'";
    connection.query(query, function (err, data) {
      if(err){
        next(err);
        return;
      }
      entity.data = data;
      entity.status = 200;
      res.json(entity);
      next();
    });
  };
  
  this.getCandidateById = function (req, res) {

    let query = "SELECT candidate.id as id, " +
      " first_name as name, last_name as lastName, phone, address, email," +
      " job_title as position," +
      " salary as payment, status.name as status,	" +
      " DATEDIFF(CURRENT_DATE(), date_publishing) as date,"	+
      " DATE_FORMAT(`date_publishing`, \"%M %d %Y\") as date_publishing,"	+
      " image_url as image" +
      " FROM candidate " +
      "JOIN status on candidate.status_id = status.id WHERE candidate.id="+ req.params.id;

    connection.query(query, function (err, data) {
      if (err) throw err;
      else {
        candidate.contact = data;
        query = "SELECT name FROM skill WHERE candidate_id="+ req.params.id;
        connection.query(query, function (err, data) {
          if (err) throw err;
          else {
            candidate.skills = data;
            query = "SELECT * FROM experience WHERE candidate_id="+ req.params.id;
            connection.query(query, function (err, data) {
              if (err) throw err;
              else {
                candidate.experience = data;
                candidate.status = 200;
                res.json(candidate);
              }
            });
          }
        });
      }
    });
  };

  this.updateCandidate = function (req, res) {
    let candidate = JSON.parse(req._body);
    let query = "UPDATE `candidate` SET " +
      "`first_name` = '" + candidate.name+"'"+
      ", `last_name` = '" + candidate.lastName+"'"+
      ", `salary` = " + candidate.salary+
      ", `job_title` = '" + candidate.position+"'"+
      ", `phone` = '" + candidate.phone+"'"+
      ", `email` = '" + candidate.email+"'"+
      ", `address` = '" + candidate.address+"'"+
      ", `date_publishing` ='" + candidate.datePublishing+"'"+
      ", `status_id`= (SELECT id FROM status WHERE status.name = '" + candidate.status +"') "+
      "  WHERE `id`=" + req.params.id;

    connection.query(query, function (err, data) {
      if (err) throw err;
      else {
        entity.status = 200;
        res.json(entity);
      }
    });
  };

  this.addSkill = function (req,res) {
    let query = "INSERT INTO `hr_application`.`skill` (`name`, `candidate_id`)" +
      " VALUES ('"+req._body+"', '"+req.params.id+"')";

    connection.query(query, function (err, data) {
      if (err) throw err;
      else {
        entity.status = 200;
        res.json(entity);
      }
    });
  };

  this.addExperience = function (req, res) {
    let experience = JSON.parse(req._body);
    let query = "INSERT INTO `hr_application`.`experience` " +
      "(`name`, `period`, `position`, `location`, `company`, `description`, `candidate_id`)" +
      " VALUES ('"+experience.company+"', '"+experience.period+"', '"+experience.position+
      "', '"+experience.location+"', '"+experience.company+
      "', '"+experience.description+"', '"+req.params.id+"')";

    connection.query(query, function (err, data) {
      if (err) throw err;
      else {
        entity.status = 200;
        res.json(entity);
      }
    });
  };

  this.addReview = function (req, res) {
    let review = JSON.parse(req._body);
    let query = "INSERT INTO `hr_application`.`review` " +
      "(`content`, `candidate_id`, `user_id`)" +
      " VALUES ('"+review.content+"', '"+req.params.id+"', '"+review.user_id+"')";

    connection.query(query, function (err, data) {
      if (err) throw err;
      else {
        entity.status = 200;
        res.json(entity);
      }
    });
  };

  this.getReview = function (req, res) {
    let query = "SELECT review.id, review.content, user.first_name, user.last_name " +
      "FROM hr_application.review JOIN user on user.id = review.user_id";

    connection.query(query, function (err, data) {
      if (err) throw err;
      else {
        entity.status = 200;
        entity.data = data;
        res.json(entity);
      }
    });
  };
  
  this.getCandidatesForInterview = function (req, res, next) {
    let query = "SELECT id, first_name as name, last_name as lastName FROM candidate";
    connection.query(query, function (err, data) {
      if(err){
        next(err);
        return;
      }
      entity.data = data;
      entity.status = 200;
      res.json(entity);
      next();
    });
  };
  function addFilter(filter) {
    filter = filter.split("&");
  
    let name = filter[0].substring(filter[0].indexOf("="), filter[0].length).replace("=", "");
    let email = filter[1].substring(filter[1].indexOf("="), filter[1].length).replace("=", "");
    let position = filter[2].substring(filter[2].indexOf("="), filter[2].length).replace("=", "");
    let date = filter[3].substring(filter[3].indexOf("="), filter[3].length).replace("=", "");
    let status = filter[4].substring(filter[4].indexOf("="), filter[4].length).replace("=", "");
    
    
    let query = 'HAVING ';
  
    if (name !== "none") {
      query += 'first_name LIKE ';
      query += '\'%' + name + '%\'';
      query += ' AND ';
    }
    if (position !== "none") {
      query += 'job_title LIKE ';
      query += '\'%' + position + '%\'';
      query += ' AND ';
    }
    if (email !== "none") {
      query += 'email LIKE ';
      query += '\'%' + email + '%\'';
      query += ' AND ';
    }
    if (date !== "none") {
      query += 'date =';
      query += '\'' + date + '\'';
      query += ' AND ';
    }
    if (status !== "none") {
      query += 'status LIKE';
      query += '\'%' + status + '%\'';
      query += ' AND ';
    }
    query = query.substring(0, (query.length - 4));
  
    return query;
  }

  function computeRange(rows, page, total) {
    if (total % rows === 0) {
      if (page === 1) {
        return page + "-" + page * rows;
      }
      else {
        return (page * rows - rows + 1) + "-" + page * rows;
      }
    } else {
      let delta = total % rows;
      let diff = rows - delta;

      if (page * rows > total) {
        return ((page * rows - rows + 1) + "-" + (page * rows - diff));
      } else {
        return (page * rows - rows + 1) + "-" + (page * rows);
      }
    }
  }
}


module.exports = new candidateController();

