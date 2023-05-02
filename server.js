const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 3000

const hostname = process.env.HOSTNAME || 'localhost';

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});