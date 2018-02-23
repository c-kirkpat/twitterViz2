import React, { Component } from 'react';
//import Twitter from 'twitter';
import { getTweet } from '../reducers/index'
import store from '../store';
import openSocket from 'socket.io-client';
import { VictoryPie, VictoryContainer } from 'victory';
import Area from './Area'
import Feeds from './Feeds'
import { Icon, Label } from 'semantic-ui-react'

const socket = openSocket('http://localhost:1337')
//var socket = io.connect('http://localhost');


function newTweet(cb) {
  socket.on('newTweet', tweet => cb(tweet));
}
function newDog(cb) {
  socket.on('newDog', dog => cb(dog));
}
function newCat(cb) {
  socket.on('newCat', cat => cb(cat));
}
function newPizza(cb) {
  socket.on('newPizza', pizza => cb(pizza))
}
function newDonut(cb) {
  socket.on('newDonut', donut => cb(donut))
}
export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      dogs: [],
      dogCounter: 0,
      cats: [],
      catCounter: 0,
      pizzas: [],
      pizzaCounter: 0,
      donuts: [],
      donutCounter: 0,
      selection: 'pie',
      selectionInput: '',
    }
    newTweet((tweet) => {
      this.setState({
        tweets: [...this.state.tweets, tweet],
      })
    })
    newDog((dog) => {
      this.setState({
        dogs: [...this.state.dogs.slice(-30), dog],
        dogCounter: this.state.dogCounter + 1
      })
    })
    newCat((cat) => {
      this.setState({
        cats: [...this.state.cats.slice(-30), cat],
        catCounter: this.state.catCounter + 1

      })
    })
    newDonut((donut) => {
      this.setState({
        donuts: [...this.state.donuts.slice(-30), donut],
        donutCounter: this.state.donutCounter + 1
      })
    })
    newPizza((pizza) => {
      this.setState({
        pizzas: [...this.state.pizzas.slice(-30), pizza],
        pizzaCounter: this.state.pizzaCounter + 1
      })
    })

    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSelection(e) {
    this.setState({ selectionInput: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ selection: this.state.selectionInput }, () => {
      console.log(this.state.selection)
    })
  }

  render() {
    let dogData = this.state.dogs.map((dog, i) => ({ x: i, y: dog.text.length }))
    let catData = this.state.cats.map((cat, i) => ({ x: i, y: cat.text.length }))
    let pizzaData = this.state.pizzas.map((pizza, i) => ({ x: i, y: pizza.text.length }))
    let donutData = this.state.donuts.map((donut, i) => ({ x: i, y: donut.text.length }))
    let dataWrapper = [
      catData,
      dogData,
      pizzaData
    ]
    switch (this.state.selection) {
      case 'feeds':
        return (
          <div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <select onChange={this.handleSelection}>
                  <option value=''> Pick one! </option>
                  <option value='pie'>Pie</option>
                  <option value='area'>Area</option>
                  <option value='feeds'>Feeds</option>
                </select>
                <button type="submit"> Submit </button>
              </form>
            </div>
            <Label>Cats: {this.state.catCounter}</Label>
            <Label>Dogs: {this.state.dogCounter}</Label>
            <Label>Pizzas: {this.state.pizzaCounter}</Label>
            <Label>Donuts: {this.state.donutCounter}</Label>
            <Feeds theTweets={{
              dogs: this.state.dogs,
              cats: this.state.cats,
              pizzas: this.state.pizzas
            }} />
          </div>
        )
      case 'pie':
        return (
          <div style={{ height: '300px' }}>
            <div>
              <form onSubmit={this.handleSubmit}>
                <select onChange={this.handleSelection}>
                  <option value=''> Pick one! </option>
                  <option value='pie'>Pie</option>
                  <option value='area'>Area</option>
                  <option value='feeds'>Feeds</option>

                </select>
                <button type="submit"> Submit </button>
              </form>
            </div>
            <VictoryPie
              colorScale={"blue"}
              padAngle={2}
              innerRadius={20}
              data={[
                { x: 'Cats', y: this.state.cats.length },
                { x: 'Dogs', y: this.state.dogCounter },
                { x: 'Donuts', y: this.state.donuts.length },
                { x: 'Pizzas', y: this.state.pizzas.length }
              ]}
            />
            <Label>Cats: {this.state.catCounter}</Label>
            <Label>Dogs: {this.state.dogCounter}</Label>
            <Label>Pizzas: {this.state.pizzaCounter}</Label>
            <Label>Donuts: {this.state.donutCounter}</Label>
          </div>
        )
      case 'area':
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <select onChange={this.handleSelection}>
                <option value=''> Pick one! </option>
                <option value='pie'>Pie</option>
                <option value='area'>Area</option>
                <option value='feeds'>Feeds</option>

              </select>
              <button type="submit"> Submit </button>
            </form>
            <Area pData={dataWrapper} />
            <Label>Cats: {this.state.catCounter}</Label>
            <Label>Dogs: {this.state.dogCounter}</Label>
            <Label>Pizzas: {this.state.pizzaCounter}</Label>
            <Label>Donuts: {this.state.donutCounter}</Label>
          </div>
        )
      default:
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <select onChange={this.handleSelection}>
                <option value=''> Pick one! </option>
                <option value='pie'>Pie</option>
                <option value='area'>Area</option>
                <option value='feeds'>Feeds</option>

              </select>
              <button type="submit"> Submit </button>
            </form>
            <div> FORM FAILED</div>
          </div>
        )
    }
  }
}

/* <form>
<input
  type='text'
  name='name'
  placeholder='first tracker'
  value={this.state.firstTrackerInput}
  onChange={this.handleFirstChange}
/>
<input
  type='text'
  name='name'
  placeholder='first tracker'
  value={this.state.secondTrackerInput}
  onChange={this.handleSecondChange}
/>
<input
  type='text'
  name='name'
  placeholder='first tracker'
  value={this.state.thirdTrackerInput}
  onChange={this.handleThirdChange}
/>
<button type='submit'>Submit</button>
</form> */