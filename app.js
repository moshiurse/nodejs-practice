const http = require("http");

const routes = require('./routes');

const server = http.createServer(routes); //for way2 & 3 & 4 use routes.handler in parameter

server.listen(3000);
