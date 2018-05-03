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

  this.getVacancies =  (req, res, next) => {
    let connection = mysql.createConnection(config.database);
    connection.connect();

    // let complexQuery= "SELECT * FROM vacancy ORDER BY id DESC LIMIT 10 ";

      let complexQuery = "SELECT (SELECT COUNT(*) FROM vacancy  ?) as total, id, position, description" +
        ", salary" +
        " FROM vacancy ?  ORDER BY id DESC LIMIT " + req.query.begin + "," + req.query.rows;

      let criteria = util.addFilterForVacancies(req.query);

     complexQuery = complexQuery.replace("\?", criteria).replace("\?", criteria);

      connection.query(complexQuery,  (err, data) => {
        if (err) {
          connection.end();
          next(err);
        }
        else {
            connection.end();
            res.json(200,{
              data : data,
              status: 200,
              total: (data.length) ? data[0].total: 0,
              range: util.computeRange(req.query.rows, req.query.page ,this.total)
            });
            next();

        }
      });
  };

  this.addVacancies =  (req, res, next) => {
    let vacancy = JSON.parse(req._body);

    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "INSERT INTO `vacancy` " +
      "(`position`,`salary`,`description`)" +
      " VALUES ('"+vacancy.position+"', '"+vacancy.salary+"', '"+vacancy.description+
      "')";

    // this.updateVacancy = (req, res, next) => {
    //   let vacancy = JSON.parse(req._body);
    //   let connection = mysql.createConnection(config.database);
    //   connection.connect();
    //   let query = "UPDATE `vacancy` SET " +
    //     "`position ` = '" + vacancy.position + "'" +
    //     ", `description` = '" + vacancy.description+ "'" +
    //   ", `salary` = '" + vacancy.salary + "'" + " WHERE `id` =" + req.params.id;
    //     // ", `vacancy_id`= UPDATE id FROM vacancy WHERE `vacancy.id` =" + req.params.id;
    //   // ", `vacancy_id`= (SELECT id FROM vacancy WHERE `id` = '" + user.role +"') "+
    //   // "  WHERE `id`=" + req.params.id;
    // };
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

}

module.exports = new VacancyController();
