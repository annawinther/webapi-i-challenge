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
            // console.log('happy');
            res.status(200).json(data);
        })
        .catch(err => {
            // console.log('sad')
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    Hub.findById(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." } )
        })
})

server.post('/api/users', (req, res) => {
    Hub.update(req.params.id, req.params.user)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.statys(500).json('soryyyyy')
        })
})

// step four: listen for incoming requests
server.listen(3001, () => {
    console.log('listening on port 3001')
})