/**
 * Created by Denis on 02.04.2018.
 */
'use strict';
function UtilController() {
	let _self = this;

	_self.computeRange = (rows, page, total) =>{
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
	};

	_self.addFilterForCandidates = (filter) =>{
		let query = 'HAVING ';

		if (filter.name !== "") {
			query += 'first_name LIKE ';
			query += '\'%' + filter.name + '%\'';
			query += ' AND ';
		}
		if (filter.position !== "") {
			query += 'job_title LIKE ';
			query += '\'%' + filter.position + '%\'';
			query += ' AND ';
		}
		if (filter.email !== "") {
			query += 'email LIKE ';
			query += '\'%' + filter.email + '%\'';
			query += ' AND ';
		}
		if (filter.date !== "") {
			query += 'date LIKE';
			query += '\'' + filter.date + '%\'';
			query += ' AND ';
		}
		if (filter.status !== "") {
			query += 'status LIKE';
			query += '\'%' + filter.status + '%\'';
			query += ' AND ';
		}
		query = query.substring(0, (query.length - 'AND '.length));

		return (query === 'HAV')? ' ' : query;
	};

	_self.addFilterForVacancies = (filter) =>{

		let query = 'WHERE ';

		if (filter.position !== "none") {
			query += 'position LIKE ';
			query += '\'%' + filter.position + '%\'';
			query += ' AND ';
		}
		if (filter.description !== "none") {
			query += 'description LIKE ';
			query += '\'%' + filter.description + '%\'';
			query += ' AND ';
		}
		if (filter.salary !== "none") {
			query += 'salary LIKE ';
			query += '\'%' + filter.salary + '%\'';
			query += ' AND ';
		}
		query = query.substring(0, (query.length - 'AND '.length));

		return (query === 'WH')? ' ' : query;

	};
}

module.exports = new UtilController();
