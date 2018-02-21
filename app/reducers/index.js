/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios'

const initialState = []

const GET = 'GET_TWEETS'

const get = tweet => ({type: GET, tweet})

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET:
      return [...state, action.tweet]
    default: return state
  }
};

export const getTweet = () => dispatch => {
  axios.get('/api/twitter')
  .then(tweet => dispatch(get(tweet.data)))
  .catch(err => console.error(err));
}

export default rootReducer
