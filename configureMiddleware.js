const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = server => {
    server.use(cors());
    server.use(express.json());
    server.use(helmet());
    server.use(express.static(__dirname + '/public'));
}