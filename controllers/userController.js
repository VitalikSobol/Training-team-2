/**
 * Created by Denis on 23.03.2018.
 */
'use strict';

function UserController() {
	let _self = this;
	const mysql = require('mysql');
	const config = require('../config');
	const connection = mysql.createConnection(config.database);
	
	let entity = {
		data: [],
		status: 0,
	};
	
	_self.getAll = function (req, res, next) {
		let query = "SELECT id, first_name as name, last_name as lastName FROM user";
		connection.query(query, function (err, data) {
			if(err){
				next(err);
				return;
			}
			entity.data = data;
			entity.status = 200;
			res.json(entity);
			next();
		});
	};
}

module.exports = new UserController();