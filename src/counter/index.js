import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import Main from './Main'
import Reducers from './reducers'

let store = createStore(Reducers)

class CounterRoot extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default CounterRoot;
