// // implement your API here

// step one: bring express and create an express app
const express = require('express');
const server = express();

const Hub = require('./data/db');

// step two: configure the newly created express app
// we need to parse as JSON the request body
server.use(express.json());

// step three: create endpoints
server.get('/api/users', (req, res) => {
    Hub.find()
        .then(data => {
            console.log('happy');
            res.status(200).json(data);
        })
        .catch(err => {
            console.log('sad')
            res.json(err)
        })
})



// step four: listen for incoming requests
server.listen(3001, () => {
    console.log('listening on port 3001')
})