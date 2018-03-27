/**
 * Created by Denis on 23.03.2018.
 */
'use strict';

function UserController() {
	let _self = this;
	const mysql = require('mysql');
	const config = require('../config');
	
	let entity = {
		data: [],
		status: 0,
	};
	
	_self.getAll = function (req, res, next) {
		let connection = mysql.createConnection(config.database);
		connection.connect();
		let query = "SELECT id, first_name as name, last_name as lastName FROM user";
		connection.query(query, function (err, data) {
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
}

module.exports = new UserController();