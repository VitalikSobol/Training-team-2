/**
 * Created by Denis on 28.03.2018.
 */
'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) =>{
	try {
		let token = req.headers.authorization.split(" ")[1];
		let decoded = jwt.verify(token, config.JWT_KEY);
		req.token = decoded;
		next();
	}catch (error){
		res.status(401);
		return res.json({
			message: 'Authorization error'
		});
	}
};