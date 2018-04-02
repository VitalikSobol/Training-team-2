'use strict';
function VacancyController() {
  const mysql = require('mysql');
  const config = require('../config');
  const util = require('./utilController');

  let entity = {
    data: [],
    status: 0,
    total: 0,
    range: ""
  };

  this.getVacancies = function (req, res, next) {
    let connection = mysql.createConnection(config.database);
    connection.connect();
    
    if (req.query.filter === "position=none&name=none&email=none&lastName=none") {
      let vacanciesQuery = "SELECT (SELECT COUNT(*)as total FROM vacancy) as total, id, position," +
        " description, salary" +
        " FROM vacancy LIMIT " + req.query.begin + "," + req.query.rows;

      connection.query(vacanciesQuery, function (err, data) {
        if (err){
          connection.end();
          next(err);
        }
        else {
          entity.data = data;
          entity.status = 200;
          entity.total = data[0].total || 0;
          entity.range = util.computeRange(req.query.rows, req.query.page, entity.total);
          connection.end();
          res.json(entity);
          next();
        }
      });
    }
    else {
      let complexQuery = "SELECT (SELECT COUNT(*) FROM vacancy  ? ) as total, id, position, description" +
        ", salary" +
        " FROM vacancy ? LIMIT " + req.query.begin + "," + req.query.rows;

      let criteria = addFilter(req.query.filter);

      complexQuery = complexQuery.replace("\?", criteria).replace("\?", criteria);

      connection.query(complexQuery, function (err, data) {
        if (err) {
          connection.end();
          next(err);
        }
        else {
          if (data.length === 0) {
            entity.data = [];
            entity.status = 200;
            entity.total = 0;
            entity.range = util.computeRange(req.query.rows, req.query.page, entity.total);
            connection.end();
            res.json(entity);
            next();
          } else {
            entity.data = data;
            entity.status = 200;
            entity.total = data[0].total || 0;
            entity.range = util.computeRange(req.query.rows, req.query.page, entity.total);
            connection.end();
            res.json(entity);
            next();
          }
        }
      });
    }
  };

  this.addVacancies = function (req, res, next) {
    let vacancy = JSON.parse(req._body);

    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `vacancy` " +
      "(`position`,`salary`,`description`)" +
      " VALUES ('"+vacancy.position+"', '"+vacancy.salary+"', '"+vacancy.description+
      "')";

    connection.query(query, function (err, data) {
      if (err){
        connection.end();
        console.log(err);
        next(err);
      }
      else {
        entity.status = 200;
        connection.end();
        res.json(entity);
        next();
      }
    });
  };

  function addFilter(filter) {
    filter = filter.split("&");

    let position = filter[0].substring(filter[0].indexOf("="), filter[0].length).replace("=", "");
    let description = filter[1].substring(filter[1].indexOf("="), filter[1].length).replace("=", "");
    let salary = filter[2].substring(filter[2].indexOf("="), filter[2].length).replace("=", "");


    let query = 'WHERE ';

    if (position !== "none") {
      query += 'position LIKE ';
      query += '\'%' + position + '%\'';
      query += ' AND ';
    }
    if (description !== "none") {
      query += 'description LIKE ';
      query += '\'%' + description + '%\'';
      query += ' AND ';
    }
    if (salary !== "none") {
      query += 'salary LIKE ';
      query += '\'%' + salary + '%\'';
      query += ' AND ';
    }
    query = query.substring(0, (query.length - 4));

    return query;
  }
}

module.exports = new VacancyController();