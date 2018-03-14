'use strict';
function CandidateController() {
  const mysql = require('mysql');
  const config = require('../config');
  const connection = mysql.createConnection(config.database);

  let entity = {
    data: [],
    status: 0,
    total: 0,
    range: ""
  };

  this.getCandidates = function (req, res) {

    if(req.query.filter === 'state=Empty&name=none') {

      let candidatesQuery = "SELECT (SELECT COUNT(*) FROM candidate) as total,candidate.id as id, first_name as name," +
        " last_name as lastName, job_title as position, salary as payment, status.name as status," +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date," +
        " image_url as image" +
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
      let complexQuery = "SELECT (SELECT COUNT(*) FROM candidate  ? ) as total, candidate.id as id, " +
        " first_name as name, last_name as lastName," +
        " job_title as position," +
        " salary as payment, status.name as status,	" +
        " DATEDIFF(CURRENT_DATE(), date_publishing) as date,"	+
        " image_url as image" +
        " FROM candidate JOIN status on candidate.status_id = status.id ? LIMIT " + req.query.begin + "," + req.query.rows;

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

  function addFilter(filter) {
    filter = filter.split("&");

    let state = filter[0].substring(filter[0].indexOf("="), filter[0].length).replace("=", "");
    let name = filter[1].substring(filter[1].indexOf("="), filter[1].length).replace("=", "");

    let query = 'WHERE ';

    if (state !== "Empty") {
      query += 'status.name = ';
      query += '\'' + state + '\'';
      query += ' AND ';
    }
    if (name !== "none") {
      query += '(first_name LIKE ';
      query += '\'%' + name + '%\'';
      query += ' OR last_name LIKE ';
      query += '\'%' + name + '%\')';
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

module.exports = new CandidateController();