const http= require('http');
const app = require('./app');
const server = http.createServer();
const port = process.env.PORT || 3000;
server.listen(port);