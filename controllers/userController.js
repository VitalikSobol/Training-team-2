/**
 * Created by Denis on 23.03.2018.
 */
'use strict';

function UserController() {
	let _self = this;
	const mysql = require('mysql');
	const config = require('../config');
	
	_self.getAll = (req, res, next) => {
		let connection = mysql.createConnection(config.database);
		connection.connect();
		let query = "SELECT id, first_name as name, last_name as lastName FROM user";
		connection.query(query, (err, data) => {
			if(err){
				console.log(err);
				connection.end();
				next(err);
			}
			connection.end();
			res.json(200,{
				data : data,
				status: 200
			});
			next();
		});
	};
}

module.exports = new UserController();