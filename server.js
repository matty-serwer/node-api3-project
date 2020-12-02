const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// custom middleware
// request method, request url, and a timestamp

function logger(req, res, next) {}

module.exports = server;
