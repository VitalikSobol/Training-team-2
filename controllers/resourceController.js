/**
 * Created by Denis on 12.03.2018.
 */
'use strict';

function ResourceController() {
	let _self = this;
	const fs = require('fs');
	
	_self.loadResource = function (req, res, next) {
		let url = req.url.replace("/", "");
		fs.readFile(url, function (err, data) {
			if (err) {
				next(err);
				return;
			}
			let fileType = url.substring(url.indexOf("."), url.length);
			switch (fileType){
				case ('.css') : {
					res.setHeader('Content-Type', 'text/css');
					break;
				}
				case ('.html') : {
					res.setHeader('Content-Type', 'text/html');
					break;
				}
				case('.js'): {
					res.setHeader('Content-Type', 'text/javascript');
					break;
				}
				case('.png') : {
					res.setHeader('Content-Type', 'image/png');
					break;
				}
			}
			
			res.write(data);
			res.end();
			next();
		});
	};
}

module.exports = new ResourceController();
