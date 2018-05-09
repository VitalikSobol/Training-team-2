/**
 * Created by Denis on 23.03.2018.
 */
'use strict';

function UserController() {
  let _self = this;
  const mysql = require('mysql');
  const config = require('../config');
  const jwt = require('jsonwebtoken');


  let entity = {
    data: [],
    status: 0,
  };


	_self.getAllInterviewers =  (req, res, next) => {
		let connection = mysql.createConnection(config.database);
		connection.connect();
		let query = "SELECT id, first_name as name, last_name as lastName FROM user";
		connection.query(query,  (err, data) => {
			if(err){
				console.log(err);
				connection.end();
				next(err);
			}
			entity.data = data;
			entity.status = 200;
			connection.end();
			res.json(entity);
			next();
		});
	};

  _self.getUser = (req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ")[1];
      let data = jwt.verify(token, config.JWT_KEY);
      let connection = mysql.createConnection(config.database);
      connection.connect();
      let query = "SELECT user.id as id, first_name as firstName, last_name as lastName, email, role.name as role FROM user " +
        " JOIN role ON role.id = role_id WHERE user.`id`=" + data.id;
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          next(err);
        }
        else {
          connection.end();
          res.status(200);
          res.json(data[0]);
          next();
        }
      });
    } catch (error) {
      res.status(500);
      console.log(error);
      res.error = error;
      next();
    }
  };

  _self.updateUser = (req, res, next) => {
    let user = JSON.parse(req.body);
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let query = "UPDATE `user` SET " +
      "`first_name` = '" + user.firstName + "'" +
      ", `last_name` = '" + user.lastName + "'" +
      ", `email` = '" + user.email + "'" +
      ", `role_id`= (SELECT id FROM role WHERE role.name = '" + user.role + "') " +
      "  WHERE `id`=" + req.params.id;

    connection.query(query, (err, data) => {
      if (err) {
        connection.end();
        res.status(400);
        res.json({
          message: "Check entered data"
        });
        next();
      }
      else {
        res.status(200);
        connection.end();
        res.end();
        next();
      }
    });
  };
}

module.exports = new UserController();
