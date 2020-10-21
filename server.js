const express = require('express');
const server = express();
const configureMiddleware = require('./configureMiddleware.js');
const fs = require('fs');
const xmlParser = require('xml2json');
const formidable = require('formidable');
const tmp = require('tmp');


configureMiddleware(server);

server.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

server.post('/', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const [file] = Object.values(files);
        
        // next steps are to save the json to a format and display it as a link for the user to download
        fs.readFile(file.path, function(err, data) {
            const xmlJson = xmlParser.toJson(data, {reversible: true, object: true});
            const stringified = JSON.stringify(xmlJson)
            tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
                if (err) throw err;
              
                console.log('File: ', path);
                console.log('Filedescriptor: ', fd);
                
                fs.writeFileSync(path, stringified)

                res.download(path)
            });
        })
      });
})


module.exports = server;