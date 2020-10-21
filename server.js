const express = require('express');
const server = express();
const configureMiddleware = require('./configureMiddleware.js');
const fs = require('fs');
const multer = require('multer');
const xmlParser = require('xml2json');


configureMiddleware(server);

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}.xml`)
    }
})

const upload = multer({storage})

server.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})



server.post('/', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    fs.readFile(file.path, function(err, data) {
        const xmlObj = xmlParser.toJson(data, {reversible: true, object: true});
        console.log(xmlObj)
        res.send(xmlObj)
    })

    }
)


module.exports = server;