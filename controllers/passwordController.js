'use strict';

function PasswordController() {
  let _self = this;

  const mysql = require('mysql');
  const config = require('../config');
  const bcrypt = require('bcrypt');
  const nodemailer = require('nodemailer');

  const jwt = require('jsonwebtoken');

  let smtpTransport = nodemailer.createTransport({
    service: config.mailer.service,
    auth: {
      user: config.mailer.username,
      pass: config.mailer.password
    }
  });

  let sendMail = (user, token) => {
    return new Promise((resolve, reject) => {
      smtpTransport.sendMail({
        from: config.mailer.sendAddr,
        to: user.email,
        subject: "Reset password",
        html: "Hi, " + user.name + ".<br> You recently requested to reset your password for your 'HR App' account." +
        " Use the link below to reset it. This password reset is only valid for the next 2 hours.<br>" +
        " http://localhost:5000/password/" + token
      },  (error, response) => {
        if (error) {
          reject(new Error(error));
        }
        resolve(response.message);
      });
    });
  };


  let hashingPassword = (password) => {
    return bcrypt.hashSync(password, 10)
  };

  let generateWebToken = (user) => {
    return new Promise((resolve, reject) => {
      jwt.sign({
          email: user.email,
          id: user.id
        },
        config.JWT_KEY,
        {
          expiresIn: "2h"
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


  let findUserByEmail = (user) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(config.database);

      let query = "SELECT id, first_name as name, email, password FROM user" +
        " WHERE email='" + user.email + "'";

      connection.connect();
      connection.query(query, (err, data) => {
        if (err) {
          connection.end();
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

  _self.sendInstruction = (req, res, next) => {
    let data = JSON.parse(req.body);
    let userDB = {};

    findUserByEmail(data)
      .then(
        user => {
          userDB = user;
        },
        error => {
          if (error.message === "user not found") {
            res.status(400);
            res.json({
              message: "The email you entered is incorrect"
            });
            res.send();
            next();
          }
          res.status(500);
          res.end();
          next();
        }
      )
      .then(
        result => {
          return generateWebToken(userDB);
        }
      )
      .then(
        token => {
          return sendMail(userDB, token);
        },
        error => {
          res.status(500);
          res.send();
          next();
        }
      ).then(
      result => {
        res.status(200);
        res.end();
        next();
      },
      error => {
        res.status(500);
        res.json({
          message: error.message
        });
        res.end();
        next();
      }
    );
  };

  _self.checkToken = (req, res, next) => {
    let token = req.params.token;
    try {
      jwt.verify(token, config.JWT_KEY);
      res.redirect('/views/password.html?token=' + token, next);
    } catch (error) {
      res.redirect('/', next);
    }
  };


  _self.setPassword = (req, res, next) => {
    let data = JSON.parse(req.body);
    try {
      let token = jwt.verify(data.token, config.JWT_KEY);
      let connection = mysql.createConnection(config.database);
      connection.connect();
      let query = "UPDATE `user` SET `password` = '" + hashingPassword(data.password)+"'"+
        "  WHERE `id`=" + token.id;
      connection.query(query,  (err, data) => {
        if (err){
          connection.end();
          next();
        }
        else {
          connection.end();
          res.status(200);
          res.send();
          next();
        }
      });
    } catch (error) {
      res.status(400);
      res.json({
        message: error.message
      });
      next();
    }
  };
}

module.exports = new PasswordController();
