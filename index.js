// implement your API here
// built in node.js module to handle http traffic
const http = require('http');
// the local computer where the server is running
const hostname = '127.0.0.1';
// a port we'll use to watch for traffic
const port = 3001;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World from Node\n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})


// step one: bring express and create an express app
const express = require('express');
const server = express();

const Hub = require('./data/db');

// step two: configure the newly created express app
// we need to parse as JSON the request body
server.use(express.json());

// step three: create endpoints





// step four: listen for incoming requests
server.listen(3001, () => {
    console.log('listening on port 3001')
})