const http = require('http');

const routes = require('./newroutes');

// const server = http.createServer(routes);
const server = http.createServer(routes.handler);


server.listen(8080, () => console.log('this code is running on the port name 8080'));