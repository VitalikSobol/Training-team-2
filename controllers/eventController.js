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
		connection.query("SELECT id, title, start, end, allDay, description, color, place" +
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
	
	let insertUserAndCandidate = function (event, user, candidate) {
		return new Promise((resolve, reject) => {
			let query = "INSERT INTO user_has_event (`event_id`, `user_id`, `candidate_id`) VALUES (" +
					"'" + event + "'," +
					"'" + user + "'," +
					"'" + candidate + "')";
			connection.query(query, function (err, data) {
				if(err){
					reject(err);
				}
				resolve();
			});
		});
	};
	
	let createSubTaskForInsert = function (interviewer, candidates, event) {
		let promises = [];
		candidates.forEach(function (candidate) {
			promises.push(insertUserAndCandidate(event,interviewer,candidate));
		});
		
		Promise.all(promises).then()
			.catch(function (err) {
				console.log(err);
			});
	};
	
	let createTaskForInsert = function (interwiers, candidates, event) {
		interwiers.forEach(function (item) {
			createSubTaskForInsert(item, candidates, event);
		});
	};
	
		
	self.createEvent = function (req,res,next) {
		
		let event = JSON.parse(req.body);
		
		new Promise((resolve, reject) => {
			let query = "SELECT MAX(id) as lastId FROM event";
			connection.query(query, function (err, data) {
				if (err) {
					reject(new Error(err));
				}
				resolve(data[0].lastId + 1);
			});
		}).then(
			result => {
				let query = "INSERT INTO event (`id`, `title`, `start`, `end`, `allDay`, `place`, `color`, `description`) " +
					"VALUES(" +
					"'" + result + "',"+
					"'" + event.title + "'," +
					"'" + event.start+ "'," +
					"'" + event.end+ "'," +
					"'" + 0 + "'," +
					"'" + event.place + "'," +
					"'" + event.color + "'," +
					"'" + event.description + "')";
				connection.query(query, function (err, data) {
					if(err){
						throw new Error(err);
					}
				});
				return result;
			}).
			then(result => {
			 	createTaskForInsert(event.interviewers, event.candidates, result);
			})
			.catch(function (err) {
				console.log(err);
		});
		res.end();
		next();
		
	};
}

module.exports = new EventController();
