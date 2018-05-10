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

  this.getVacancies = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();

    let complexQuery = "SELECT (SELECT COUNT(*) FROM vacancy JOIN vacancy_status ON vacancy_status.id = status ?)" +
      " as total, vacancy.id, position, description, salary, vacancy_status.name as status" +
      " FROM vacancy JOIN vacancy_status ON vacancy_status.id = status ?  ORDER BY id DESC LIMIT "
      + req.query.begin + "," + req.query.rows;

    let criteria = util.addFilterForVacancies(req.query);

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

  this.addVacancies = (req, res, next) => {
    let vacancy = JSON.parse(req._body);
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `vacancy` " +
      "(`position`,`salary`,`description`)" +
      " VALUES ('" + vacancy.position + "', '" + vacancy.salary + "', '" + vacancy.description +
      "')";
    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
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

  this.updateVacancy = (req, res, next) => {
    let vacancy = JSON.parse(req._body);
    let query = "UPDATE `vacancy` SET " +
      "`position` = '" + vacancy.position + "'" +
      ", `description` = '" + vacancy.description+ "'" +
      ", `salary` = '" + vacancy.salary + "'" +
      ", `status` = (SELECT id FROM vacancy_status WHERE name = '" + vacancy.status + "')" +
      " WHERE `id` =" + req.params.id;
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(query,  (err, data) => {
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

  this.deleteVacancy = (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "DELETE FROM `vacancy` WHERE `id`='" + req.params.id + "'";
    connection.query(query,(err, data) => {
      if (err) {
        connection.end();
        next(err);
        console.log(err);
      }
      else {
        connection.end();
        res.json(200);
        next();
      }
    });
  }

}

module.exports = new VacancyController();
