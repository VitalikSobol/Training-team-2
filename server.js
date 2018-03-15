/**
 * Created by Denis on 04.03.2018.
 */
'use strict';
const restify = require('restify');
const mysql = require('mysql');
const plugins = require('restify-plugins');

const server = restify.createServer({
	name: "test",
	version: "1.0.0",
});

server.use(plugins.jsonBodyParser());
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.fullResponse());

server.listen(3001, function () {
	console.log('%s listening at %s', server.name, server.url);
});

let routes = require('./routes')(server);

