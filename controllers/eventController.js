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
		let start = req.query.from.substring(0, req.query.from.indexOf("T"));
		let end = req.query.till.substring(0, req.query.till.indexOf("T"));
		connection.query("SELECT ID as id, TITLE as title, START as start, END as end, ALL_DAY as allDay" +
										" FROM event WHERE START >= '"+ start + "'" + "AND END <= '" + end + "'", function (err, data) {
			if(err){
				next(err);
				return;
			}else {
				entity.events = data;
				entity.status = 200;
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.json(entity);
				next();
			}
		});
	};
	
	self.createEvent = function (req,res,next) {
		let event = JSON.parse(req.body);
		let query = "INSERT INTO `event` (`TITLE`, `START`, `END`, `ALL_DAY`) VALUE(" +
								"'" + event.title + "' ," +
								"'" + event.start + "' ," +
								"'" + event.end + "' ," +
								"'" + 0 + "')";
		
		connection.query(query, function (err, data) {
			if(err){
				next(err);
				return;
			}else {
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.end();
				next();
			}
		});
		
	};
}

module.exports = new EventController();
