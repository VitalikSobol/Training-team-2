/**
 * Created by Denis on 16.03.2018.
 */
'use strict';
function EventController() {
	let self = this;
	const mysql = require('mysql');
	const config = require('../config.json');
	const connection = mysql.createConnection(config.database);
	
	let entity = {
		events: [],
		status: 0
	};
	
	self.getEvents = function (req, res, next) {
		let start = req.query.from;
		let end = req.query.till;
		connection.query("SELECT id, title, start, end, allDay" +
										" FROM event WHERE start >= '"+ start + "'" + "AND end <= '" + end + "'", function (err, data) {
			if(err){
				next(err);
				return;
			}else {
				entity.events = data;
				entity.status = 200;
				res.json(entity);
				next();
			}
		});
	};
	
	self.getNotification = function (req,res, next) {
		let query = "SELECT id, title, date_format(start, '%H:%i') as start FROM event" +
								" WHERE current_timestamp() <= start";
		connection.query(query, function (err, data) {
			if(err){
				next(err);
				return;
			}
			entity.events = data;
			entity.status = 200;
			res.json(entity);
			next();
			
		});
	};
	
	self.createEvent = function (req,res,next) {
		let event = JSON.parse(req.body);
		let query = "INSERT INTO event (`title`, `start`, `end`, `allDay`) VALUE(" +
								"'" + event.title + "' ," +
								"'" + event.start + "' ," +
								"'" + event.end + "' ," +
								"'" + 0 + "')";
		
		connection.query(query, function (err, data) {
			if(err){
				next(err);
				return;
			}else {
				res.end();
				next();
			}
		});
		
	};
}

module.exports = new EventController();
