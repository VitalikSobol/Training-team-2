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


function unknownMethodHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
    let allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version'];

    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    return res.send(204);
  }
  else
    return res.send(new restify.MethodNotAllowedError());
}

server.on('MethodNotAllowed', unknownMethodHandler);

server.listen(3001, function () {
	console.log('%s listening at %s', server.name, server.url);
});

let routes = require('./routes')(server);

