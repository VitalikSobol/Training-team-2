'use strict';
const restify = require('restify');
const mysql = require('mysql');
const plugins = require('restify-plugins');
const PORT = process.env.PORT || 5000;
const path = require('path');


const server = restify.createServer({
  name: "HR_Application server",
  version: "1.0.0",
});

server.use(plugins.jsonBodyParser());
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.fullResponse());
server.use(plugins.bodyParser());

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
}

server.on('MethodNotAllowed', unknownMethodHandler);

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);


server.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});

let routes = require('./server/routes')(server);

