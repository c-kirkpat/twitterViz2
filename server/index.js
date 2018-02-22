'use strict'; 

const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
// const socketio = require('socket.io');

const app = express();

//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static middleware
app.use(express.static(path.join(__dirname, '../public')));


// //socket stuff
// let arr = [];


// const io = socketio(app)

// io.on('connection', function(socket) {
//   console.log('a new client appears');
// })

// let searchWord = 'apple'
// var client = new Twitter({
//   consumer_key: 'mosnra91NXK5HdTey6blcXD5R',
//   consumer_secret: 'g7ZlVccvd9t292JECdgWnz7kjyowzxQvz8gn18SwBl3toBORlP',
//   access_token_key: '965694392387428359-HaOPdTjCMtpf93y7CgRrEjWXkOcoPKd',
//   access_token_secret: 'yRbRmgFfhkxZTYle0vSaWs1ac1RuhdCBqXc0xwt3KT5Wb',
//   //timeout_ms:           60*1000
// });
// var stream = client.stream('statuses/filter', { track: searchWord });
// stream.on('data', function (event) {
//   console.log(event.id)
//   arr.push(event.text);
// });
// stream.on('error', function (error) {
//   throw error;
// });

app.use('/api', require('./api')); // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app