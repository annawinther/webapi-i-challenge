// // implement your API here

// step one: bring express and create an express app
const express = require('express');
const server = express();

const db = require('./data/db');

// step two: configure the newly created express app
// we need to parse as JSON the request body
server.use(express.json());

// step three: create endpoints
server.get('/api/users', (req, res) => {
    db.find()
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
    const userId = req.params.id;
    db.findById(userId)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be retrieved." } )
        })
})

server.post('/api/users', (req, res) => {
    const userData = req.body;
    db.insert(userData)
        .then(data => {
            if( userData.name && userData.bio ){
                res.status(201).json({ success: "true", userData })
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
        .then(data => {
            if (data) {
                db.remove(userId)
                .then(user => {
                    res.status(201).json({message: `user with id ${userId} is removed`})
                })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})
// step four: listen for incoming requests
server.listen(3001, () => {
    console.log('listening on port 3001')
})