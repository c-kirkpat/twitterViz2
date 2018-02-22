'use strict';


const db = require('./server/db/models')
const app = require('./server')
const PORT = 1337;
const socketio = require('socket.io');
const Twitter = require('twitter');


// db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
// .then(() => {
//   console.log('db synced')
//   var server = app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
// });
var server = app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))


//socket stuff
let arr = [];


const io = socketio(server)

let searchWord = 'apple'
var client = new Twitter({
  consumer_key: 'mosnra91NXK5HdTey6blcXD5R',
  consumer_secret: 'g7ZlVccvd9t292JECdgWnz7kjyowzxQvz8gn18SwBl3toBORlP',
  access_token_key: '965694392387428359-HaOPdTjCMtpf93y7CgRrEjWXkOcoPKd',
  access_token_secret: 'yRbRmgFfhkxZTYle0vSaWs1ac1RuhdCBqXc0xwt3KT5Wb',
  //timeout_ms:           60*1000
});
var stream = client.stream('statuses/filter', { track: 'cat, dog', filterLevel: 'medium' });

io.on('connection', function (socket) {
  console.log('a new client appears');
})
stream.on('data', function (event) {
  if (event.text.indexOf('cat') > -1){
    io.emit('newCat', event);
    console.log('cat')
  }
  if (event.text.indexOf('dog') > -1){
    io.emit('newDog', event);
    console.log('dog')
  }
  io.emit('newTweet', event)
});
stream.on('error', function (error) {
  throw error;
});

