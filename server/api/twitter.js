const router = require('express').Router();
const Twitter = require('twitter');
//


router.get('/', (req, res, next) => {
    // var stream = client.stream('statuses/filter', { track: 'apple' });
    // stream.on('data', function (event) {
    //     console.log(event.id)
    //     arr.push(event.text);
    // });

    // let arr = [];
    // stream.on('error', function (error) {
    //     throw error;
    // });

    // while(true){
    //     if (arr.length >= 10){
    //         res.json(arr)
    //     }
    // }

    setTimeout(() => {
        res.json(arr)
    }, 4000)
    // client.stream('statuses/filter', { track: 'mango' }, function (stream) {
    //     stream.on('data', function (tweet) {
    //         arr.push(tweet.id)

    //         console.log(tweet.id);
    //     });
    //     setTimeout(()=>{
    //         res.json(arr)
    //     }, 4000)

    //     stream.on('error', function (error) {
    //         console.log(error);
    //     });
    // });

})

module.exports = router;