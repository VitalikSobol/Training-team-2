/**
 * Created by Denis on 12.03.2018.
 */
'use strict';

function LoginController() {
	let _self = this;
	const fs = require('fs');
	
	_self.getLoginPage = function (req, res, next) {
		const url  = 'views/candidates.html';
		fs.readFile(url, function (err, data) {
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
	
}

module.exports = new LoginController();
