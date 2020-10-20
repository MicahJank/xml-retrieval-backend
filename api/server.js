const express = require('express');
const server = express();
const configureMiddleware = require('./configureMiddleware.js');
const fs = require('fs');


configureMiddleware(server);


server.get('/', (req, res) => {
    res.send('<h2>Api is running</h2>')
})


server.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json({message: 'Got it!'})
})


module.exports = server;