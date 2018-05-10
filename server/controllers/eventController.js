/**
 * Created by Denis on 16.03.2018.
 */
'use strict';

function EventController() {
  let self = this;
  const mysql = require('mysql');
  const config = require('../config.json');


  let entity = {
    events: [],
    status: 0
  };

  let event = {
    data: {},
    candidates: [],
    users: []
  };

  self.getEvents =  (req, res, next) => {

    /*let start = req.query.from;
    let end = req.query.till;*/

    let connection = mysql.createConnection(config.database);
    connection.connect();
    /*let query_old = "SELECT id, title, start, end, allDay, description, color, place" +
      " FROM event WHERE start >= '" + start + "'" + "AND end <= '" + end + "'";*/
    let query = "SELECT id, title, start, end, allDay, description, color, place" +
      " FROM event";
    connection.query(query,  (err, data) => {
      if (err) {
        console.log(err);
        connection.end();
        next(err);
      } else {
        connection.end();
        res.json(200,
          data
        );
        next();
      }

    });
  };

  self.updateEventById =  (req, res, next)  => {
    let event = JSON.parse(req.body);
    let connection = mysql.createConnection(config.database);
    connection.connect();

    let query = "UPDATE `event` SET " +
      "`title`='" + event.title + "', " +
      "`start`='" + event.start + "', " +
      "`end`='" + event.end + "', " +
      "`color`='" + event.color + "', " +
      "`description`='" + event.description + "', " +
      "`place`='" + event.place + "' " +
      "WHERE `id`='" + req.params.id + "';";

    connection.query(query,  (err, data)  =>{
      if (err) {
        console.log(err);
        connection.end();
        next(err);
      } else {
        connection.end();
        res.end();
        next();
      }

    });
  };


  self.getEventById =  (req, res, next) => {

    new Promise((resolve, reject) => {
      let query = "SELECT id, title, start, end, description, color, place" +
        " FROM event WHERE id = '" + req.params.id + "'";
      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query,  (err, data) => {
        if (err) {
          connection.end();
          reject(new Error(err));
        }
        event.data = data[0];
        connection.end();
        resolve(event);
      });
    }).then(event => {
      let query = "SELECT candidate_id, candidate.first_name, candidate.last_name, event_id " +
        "FROM user_has_event JOIN candidate on candidate_id = candidate.id " +
        "GROUP BY candidate_id,event_id,candidate.first_name, candidate.last_name HAVING event_id = '" + req.params.id + "'";
      let connection = mysql.createConnection(config.database);
      connection.connect();

      connection.query(query,  (err, data) => {
        if (err) {
          connection.end();
          throw new Error(err);
        }
        event.candidates = data;
        connection.end();
      });
      return event;
    }).then(event => {
      let query = "SELECT user_id, user.first_name, user.last_name, event_id " +
        "FROM user_has_event JOIN user on user_id = user.id " +
        "GROUP BY user_id,event_id,user.first_name, user.last_name HAVING event_id = '" + req.params.id + "'";
      let connection = mysql.createConnection(config.database);
      connection.connect();

      connection.query(query,  (err, data) => {
        if (err) {
          connection.end();
          throw new Error(err);
        }

        event.users = data;
        connection.end();
        res.json(event);
      });
      return event;
    }).catch( (err) => {
      console.log(err);
    });
    next();
  };

  self.getNotification =  (req, res, next) => {
    let query = "SELECT id, title, date_format(start, '%H:%i') as time, date_format(start, '%d.%m.%Y') as date FROM event" +
      " WHERE current_timestamp() <= start";
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query,  (err, data) => {
      if (err) {
        console.log(err);
        connection.end();
        next(err);
      }
      entity.events = data;
      entity.status = 200;
      connection.end();
      res.json(data);
      next();

    });
  };

  let insertUserAndCandidate =  (event, user, candidate) => {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO user_has_event (`event_id`, `user_id`, `candidate_id`) VALUES (" +
        "'" + event + "'," +
        "'" + user + "'," +
        "'" + candidate + "')";
      let connection = mysql.createConnection(config.database);
      connection.connect();
      connection.query(query,  (err, data) => {
        if (err) {
          connection.end();
          reject(new Error(err));
        }
        connection.end();
        resolve('sucess');
      });
    });
  };

  let createSubTaskForInsert =  (interviewer, candidates, event) => {
    let promises = [];
    candidates.forEach( (candidate) => {
      promises.push(insertUserAndCandidate(event, interviewer, candidate));
    });
    return promises;
  };

  let createTaskForInsert =  (interviewers, candidates, event) => {
    let promise = [];
    interviewers.forEach( (item) => {
     promise.push(createSubTaskForInsert(item, candidates, event));
    });
    return promise;
  };

  let insertEvent =  (id, event) => {
    return new Promise((resolve, reject) => {
     let query = "INSERT INTO event (`id`, `title`, `start`, `end`, `allDay`, `place`, `color`, `description`) " +
            "VALUES(" +
            "'" + id + "'," +
            "'" + event.title + "'," +
            "'" + event.start + "'," +
            "'" + event.end + "'," +
            "'" + 0 + "'," +
            "'" + event.place + "'," +
            "'" + event.color + "'," +
            "'" + event.description + "')";

      let connection = mysql.createConnection(config.database);
      connection.connect();

      connection.query(query, (err, data) =>{
        if(err){
          connection.end();
          reject(new Error(err));
        }
        connection.end();
        resolve(id);
      });
    });
  };

  let findLastEvent =  () => {
    return new Promise((resolve, reject)=>{

      let query = "SELECT MAX(id) as lastId FROM event";

      let connection = mysql.createConnection(config.database);
      connection.connect();

      connection.query(query, (err, data) =>{
        if(err){
          connection.end();
          reject(new Error(err));
        }
        connection.end();
        resolve(data[0].lastId + 1);
      });
    });
  };

  self.createEvent =  (req, res, next) => {
    let event = JSON.parse(req.body);
    findLastEvent()
    .then(
      result => {
        res.json(200, {result});
        return insertEvent(result, event);
      },
      error => {
        console.log(error.message);
        res.end();
        next();
      }
    ).then(
      result => {
        return createTaskForInsert(event.interviewers, event.candidates, result);
      },
      error => {
        console.log(error.message);
        res.end();
        next();
      }
    ).then(
      result => {
        Promise.all(result).then(
          result => {
            res.end();
            next();
          },
          error =>{
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
}
module.exports = new EventController();
