import React, { Component } from 'react';
//import Twitter from 'twitter';
import {getTweet} from '../reducers/index'
import store from '../store';
import openSocket from 'socket.io-client';
import {VictoryPie} from 'victory';
const socket = openSocket('http://localhost:1337')
//var socket = io.connect('http://localhost');


function newTweet (cb) {
  socket.on('newTweet', tweet => cb(tweet));
}
function newDog (cb) {
  socket.on('newDog', dog => cb(dog));
}
function newCat (cb) {
  socket.on('newCat', cat => cb(cat));
}
export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      dogs: [],
      cats: []
    }
    newTweet((tweet)=>{
      this.setState({
        tweets: [...this.state.tweets, tweet]
      })
    })
    newDog((dog) => {
      this.setState({
        dogs: [...this.state.dogs, dog]
      })
    })
    newCat((cat) => {
      this.setState({
        cats: [...this.state.cats, cat]
      })
    })
  }


  // componentDidMount() {
  //   store.dispatch(getTweet())
  //   const state = store.getState()
  //   this.setState({state})
  // }
  render() {

    return (
      <div>
        <VictoryPie 
          data={[
            {x: 'Cats', y: this.state.cats.length},
            {x: 'Dogs', y: this.state.dogs.length}
          ]}
        />
      </div>
    )
  }
}


