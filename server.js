const http = require('http');
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World ${new Date().toISOString()}\n`);
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});

/*
'use strict';

const hof = require('hof');
const config = require('./config.js');
const busboy = require('busboy'); // module for parsing incoming HTML form data
const bl = require('bl'); // Buffer list collector, reader and streamer thingy.
const logger = require('hof/lib/logger')({ env: config.env });
let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require)
});

const app = hof(settings);

app.use((req, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.feedbackUrl = config.survey.urls.acq;
  if (req.is('multipart/form-data')) {
    try {
      const bb = busboy({
        headers: req.headers,
        limits: {
          fileSize: config.upload.maxFileSizeInBytes
        }
      });

      bb.on('field', (key, value) => {
        req.body[key] = value;
      });

      bb.on('file', (key, file, fileInfo) => {
        file.pipe(bl((err, d) => {
          if (err) {
            logger.log('error', `Error processing file : ${err}`);
            return;
          }
          if (!(d.length || fileInfo.filename)) {
            logger.log('warn', 'Empty file received');
            return;
          }

          const fileData = {
            data: file.truncated ? null : d,
            name: fileInfo.filename || null,
            encoding: fileInfo.encoding,
            mimetype: fileInfo.mimeType,
            truncated: file.truncated,
            size: file.truncated ? null : Buffer.byteLength(d, 'binary')
          };

          if (settings.multi) {
            req.files[key] = req.files[key] || [];
            req.files[key].push(fileData);
          } else {
            req.files[key] = fileData;
          }
        }));
      });

      let error;

      bb.on('error', function (err) {
        error = err;
        next(err);
      });

      bb.on('finish', function () {
        if (!error) {
          next();
        }
      });
      req.files = req.files || {};
      req.body = req.body || {};
      req.pipe(bb);
    } catch (err) {
      logger.log('error', `Error processing file: ${err}`);
      next(err);
    }
  } else {
    next();
  }
});

module.exports = app;
*/