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
io.on('connection', function (socket) {
  console.log('a new client appears');
})
let logged = true;
let trackerString = 'cat, dog, pizza, donut'
var stream = client.stream('statuses/filter', { track: trackerString, filterLevel: 'medium' });
stream.on('data', function (event) {
  if (event.text.indexOf('cat') > -1){
    io.emit('newCat', event);
    console.log('cat')
    if (!logged){
      console.log(event);
      logged = !logged;
    }
  }
  if (event.text.indexOf('dog') > -1){
    io.emit('newDog', event);
    console.log('dog')
  }
  if (event.text.indexOf('pizza') > -1){
    io.emit('newPizza', event);
    console.log('pizza')
  }
  if (event.text.indexOf('donut') > -1){
    io.emit('newDonut', event);
    console.log('donut')
  }
  io.emit('newTweet', event)
});
stream.on('error', function (error) {
  throw error;
});





// var stream = null;
// var timer = null;
// var calm = 1;

// function restart(string) {
//   calm = 1;
//   clearTimeout(timer);
//   if (stream !== null && stream.active) {
//     stream.destroy();
//   } else {
//     init(string);
//   }
// }

// function init(string) {
//   clearTimeout(timer);
//   if (stream == null || !stream.active) {
//     client.stream('statuses/filter', {
//       track: string
//     }, function (stream) {
//       clearTimeout(timer);
//       stream = stream;
//       stream.active = true;
//       stream.on('data', function (event) {
//         if (event.text.indexOf('cat') > -1){
//           io.emit('newCat', event);
//           console.log('cat', event.id)
//         }
//         if (event.text.indexOf('dog') > -1){
//           io.emit('newDog', event);
//           console.log('dog', event.id)
//         }
//         io.emit('newTweet', event)
//       });
//       stream.on('end', function() {
//         stream.active = false;
//         clearTimeout(timer);
//         timer = setTimeout(function () {
//           clearTimeout(timer);
//           if (stream.active) {
//             stream.destroy();
//           } else {
//             init();
//           }
//         }, 1000 * calm * calm);
//       });
//       stream.on('error', function (err) {
//         if (err.message == 'Status Code: 420') {
//           calm++;
//         }
//       });
//     });
//   }
// }

// init(trackerString);

// restart('apple')
