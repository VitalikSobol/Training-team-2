/**
 * Created by Denis on 12.03.2018.
 */
'use strict';

function LoginController() {
  let _self = this;
  const fs = require('fs');
  const mysql = require('mysql');
  const config = require('../config');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');

  let hashingPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log("hashingPassword with error: "+err.message);
          reject(new Error(err));
        }
        resolve(hash);
      });
    });
  };

  let generateWebToken = (user) => {
    return new Promise((resolve, reject) => {
      jwt.sign({
          name: user.name,
          id: user.id
        },
        config.JWT_KEY,
        {
          expiresIn: "30d"
        },
        (err, token) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(token);
        }
      );
    });
  };

  let comparePasswordHash = (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        if (!result) {
          reject(new Error("hash not same"));
        }
        resolve(result);
      });
    });
  };

  let findUserInDB = (user) => {
    return new Promise((resolve, reject) => {

      let connection = mysql.createConnection(config.database);

      let query = "SELECT id, first_name as name, email, password FROM user" +
        " WHERE email='" + user.email + "'";

      connection.connect();

      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log(err.message);
          reject(new Error(err));
        }
        connection.end();
        if (!data[0]) {
          reject(new Error("user not found"));
        }
        resolve(data[0]);
      });
    });
  };

  let checkEmail = (user) => {
    return new Promise((resolve, reject) => {

      let connection = mysql.createConnection(config.database);

      let query = "SELECT id FROM user WHERE email='" + user.email + "'";

      connection.connect();

      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log("checkEmail with error: " + err.message);
          reject(new Error(err));
        }
        connection.end();
        if (data[0]) {
          reject(new Error("the email has already registered"));
        }
        resolve(user.email);
      });
    });
  };

  _self.login = (req, res, next) => {
    let data = JSON.parse(req.body);

    let dataFormDB = {};

    findUserInDB(data)
      .then(
        user => {
          dataFormDB = user;
        },
        error => {
          if (error.message === "user not found") {
            res.status(401);
            res.json({
              message: "The email or password you entered is incorrect"
            });
            next();
          }
          res.status(500);
          res.end();
          next();
        }
      ).then(
      result => {
        return comparePasswordHash(data.password, dataFormDB.password);
      }
    ).then(
      result => {
        return generateWebToken(dataFormDB);
      },
      error => {
        if (error.message === "hash not same") {
          res.status(401);
          res.json({
            message: "The email or password you entered is incorrect"
          });
          next();
        }
        res.status(500);
        res.end();
        next();
      }
    ).then(
      result => {
        if (result) {
          res.setHeader("Authorization", "Bearer " + result);
          res.end();
          next();
        }
      },
      error => {
        res.status(500);
        res.end();
        next();
      }
    );
  };

  _self.getLoginPage =  (req, res, next) =>{
    const url = 'views/login.html';
    fs.readFile(url,  (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
      next();
    });
  };


  let addUser = (user) =>{
    return new Promise((resolve, reject) => {

      let connection = mysql.createConnection(config.database);

      let query = "INSERT INTO `user` (`email`, `password`, `first_name`, `last_name`) VALUES " +
        "('"+ user.email +"', '"+ user.password+"', '"+user.firstName+"', '"+user.lastName+"');";

      connection.connect();

      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
          console.log(err.message);
          reject(new Error(err));
        }
        connection.end();
        resolve(data.insertId);
      });
    });
  };

  _self.registration = (req, res, next) => {
    let data = JSON.parse(req.body);
    let dbUser = {};

    checkEmail(data)
      .then(
        email => {
          dbUser.email = email;
        },
        error => {
          if (error.message === "the email has already registered") {
            res.status(400);
            res.json({
              message: "This email is already registered in the system. Please try to log in."
            });
            res.send();
          }
          res.status(500);
          res.end();
        }
      ).then(
      result => {
        return hashingPassword(data.password);
      }
    ).then(
      result => {
        dbUser.password = result;
        dbUser.firstName = data.firstName;
        dbUser.lastName = data.lastName;
        return addUser(dbUser);
      }
    ).then(
      result => {
        dbUser.id = result;
        return generateWebToken(dbUser);
      }
    ).then(
      result => {
        if (result) {
          res.setHeader("Authorization", "Bearer " + result);
          res.end();
          next();
        }
      },
      error => {
        res.status(500);
        res.end();
        next();
      }
    );
  };
}

module.exports = new LoginController();
