import React, { Component } from 'react';
//import Twitter from 'twitter';
import {getTweet} from '../reducers/index'
import store from '../store'

/* The code below does NOT relate to your project.
   This code is just a nice BIG example of how you can make a component.
   Also it is HILARIOUS :D Have fun!
 */


export default class Test extends Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    store.dispatch(getTweet())
    const state = store.getState()
    this.setState({state})
  }
  render() {
    setInterval(function(){
      store.dispatch(getTweet())
    }, 4000)
    console.log(this.state);
    return (
      <div>
        hello
      </div>
    )
  }
}


// export default class WinterJokes extends Component {
//   constructor() {
//     super()
//     this.nextJoke = this.nextJoke.bind(this)
//     this.answer = this.answer.bind(this)
//   }

//   componentDidMount() {
//     this.nextJoke()
//   }

//   nextJoke() {
//     this.setState({
//       joke: randomJoke(),
//       answered: false,
//     })
//   }

//   answer() {
//     this.setState({answered: true})
//   }

//   render() {
//     if (!this.state) { return null }

//     const {joke, answered} = this.state    
//     return (
//       <div>
//         <h1 onClick={answered ? this.nextJoke : this.answer}>{joke.q}</h1>
//         {answered && <h2>{joke.a}</h2>}
//       </div>
//     )
//   }
// }



