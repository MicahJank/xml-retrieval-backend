const express = require('express');
const server = express();
const configureMiddleware = require('./configureMiddleware.js');
const fs = require('fs');
const multer = require('multer');
const xmlParser = require('xml2json');
const formidable = require('formidable');



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

server.post('/', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // console.log(files.file)
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const [file] = Object.values(files);
        
        // next steps are to save the json to a format and display it as a link for the user to download
        fs.readFile(file.path, function(err, data) {
            const xmlJson = xmlParser.toJson(data, {reversible: true, object: true});
            res.send(xmlJson)
        })
      });
})


module.exports = server;