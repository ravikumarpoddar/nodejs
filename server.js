const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app); // app is listner here
server.listen(port, 
    ()=> console.log(`server is running @localhost:${port}`));
 module.exports = server;