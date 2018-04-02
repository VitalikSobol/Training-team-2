'use strict';
function candidateController() {
  const mysql = require('mysql');
  const config = require('../config');
  const util = require('./utilController');

  this.getCandidates = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();
      let complexQuery = "SELECT ( SELECT COUNT(*) rows_number FROM "+
        "(SELECT first_name, email, job_title," +
        " date_publishing, status.name as status," +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date "+
        " FROM candidate JOIN status ON candidate.status_id = status.id ?  ) as rows_number ) as total, " +
        " candidate.id as id, first_name as name, last_name as lastName, job_title as position, salary as payment, " +
        " status.name as status, DATEDIFF(CURRENT_DATE(), date_publishing) as date, email as email, " +
        " image_url as image FROM candidate JOIN status on candidate.status_id = status.id ? LIMIT " +
        req.query.begin + "," + req.query.rows;
     
      let criteria = util.addFilterForCandidate(req.query.filter);
     
      complexQuery = complexQuery.replace("\?", criteria).replace("\?", criteria);
    
      connection.query(complexQuery, (err, data) => {
        if (err) {
          connection.end();
          next(err);
        }
        else {
          connection.end();
          
          res.json(200,{
            data : data,
            status : 200,
            total: (data.length)? data[0].total: 0,
            range: util.computeRange(req.query.rows, req.query.page, this.total)
          });
          next();
        }
      });
  };

  this.getCandidateByStatus = (req, res, next) =>{
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query  = "SELECT first_name as name, image_url as image, email, job_title as position FROM candidate " +
        " JOIN status on candidate.status_id = status.id WHERE status.name = '" + req.params.name + "'";
    connection.query(query, function (err, data) {
      if(err){
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
  
  let loadMainCandidateInfo = (id) => {
    return new Promise((resolve, reject)=>{
      
      let connection = mysql.createConnection(config.database);
      let query = "SELECT candidate.id as id, " +
        " first_name as name, last_name as lastName, phone, address, email," +
        " job_title as position," +
        " salary as payment, status.name as status,	" +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date,"	+
        " DATE_FORMAT(`date_publishing`, \"%M %d %Y\") as date_publishing,"	+
        " image_url as image" +
        " FROM candidate " +
        "JOIN status on candidate.status_id = status.id WHERE candidate.id="+ id;
      connection.connect();
      connection.query(query, (err, data)=>{
        if(err){
          connection.end();
          reject(new Error(err));
        }
        connection.end();
        resolve(data);
      });
    });
  };
  
  let loadCandidateSkills = (id) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(config.database);
      let query = "SELECT name FROM skill WHERE candidate_id="+ id;
      connection.connect();
      connection.query(query, (err, data) => {
        if(err){
          connection.end();
          console.log(err);
          reject(new Error(err));
        }
          connection.end();
          resolve(data);
      });
    });
  };
  
  let loadCandidateExperience = (id) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(config.database);
      let query = "SELECT * FROM experience WHERE candidate_id="+ id;
      connection.connect();
      connection.query(query, (err, data) =>{
        if(err){
          connection.end();
          console.log(err);
          reject(new Error(err));
        }
          connection.end();
          resolve(data);
      });
    });
  };
  
  this.getCandidateById = (req, res, next) => {
    
    let candidate = {};
    
    let id  = req.params.id;
    
    loadMainCandidateInfo(id).then(
      contacts => {
        candidate.contact = contacts;
        return loadCandidateSkills(id);
      },
      error => {
        res.json(404,{
          message: 'Candidate not found',
          error: error
        });
        next();
      }
    ).then(
      skills => {
        candidate.skills = skills;
        return loadCandidateExperience(id);
      },
      error => {
        res.json(404,{
          message: 'Candidates skills not found',
          error: error
        });
        next();
      }
      ).then(
      experience => {
        candidate.experience = experience;
        candidate.status = 200;
        res.json(200, candidate);
        next();
      },
      error =>{
        res.json(404,{
          message: 'Candidates experience not found',
          error: error
        });
        next();
      }
    );
  };

  this.updateCandidate = (req, res, next) => {
    let candidate = JSON.parse(req._body);
    let connection = mysql.createConnection(config.database);
    connection.connect();
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

    connection.query(query,  (err, data) => {
      if (err){
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

  this.addSkill = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `skill` (`name`, `candidate_id`)" +
      " VALUES ('"+req._body+"', '"+req.params.id+"')";

    connection.query(query, (err, data) => {
      if (err){
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

  this.addExperience = (req, res, next) => {
    let experience = JSON.parse(req._body);

    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `experience` " +
      "(`name`, `period`, `position`, `location`, `company`, `description`, `candidate_id`)" +
      " VALUES ('"+experience.company+"', '"+experience.period+"', '"+experience.position+
      "', '"+experience.location+"', '"+experience.company+
      "', '"+experience.description+"', '"+req.params.id+"')";

    connection.query(query, function (err, data) {
      if (err){
        connection.end();
        console.log(err);
        next(err);
      }
      else {
        connection.end();
        res.json(200,{
          status: 200
        });
        next();
      }
    });
  };

  this.addReview = (req, res, next) => {
    let review = JSON.parse(req._body);
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `review` " +
      "(`content`, `candidate_id`, `user_id`)" +
      " VALUES ('"+review.content+"', '"+req.params.id+"', '"+review.user_id+"')";

    connection.query(query, (err, data) => {
      if (err){
        connection.end();
        console.log(err);
        next(err);
      }
      else {
        connection.end();
        res.json(200,{
          status: 200
        });
        next();
      }
    });
  };

  this.getReview = (req, res, next) => {
    let query = "SELECT review.id, review.content, user.first_name, user.last_name " +
      "FROM review JOIN user on user.id = review.user_id";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if (err){
        console.log(err);
        connection.end();
        next(err);
      }
      else {
        connection.end();
        res.json(200, {
          data : data,
          status: 200
        });
        next();
      }
    });
  };

  this.getCandidatesForInterview = (req, res, next) => {
    let query = "SELECT id, first_name as name, last_name as lastName FROM candidate";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query, (err, data) => {
      if(err){
        connection.end();
        console.log(err);
        next(err);
      }
      connection.end();
      res.json(200,{
        data: data,
        status: 200
      });
      next();
    });
  };
  
}


module.exports = new candidateController();

