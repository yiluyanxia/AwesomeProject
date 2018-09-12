import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { TodosReduxStack } from './router'
// import configStore from './store/configStore'
import reducers from './reducers'
import {createStore} from 'redux'
const store = createStore(reducers)
export default class TodolistRedux extends Component {
  render(){
    return (
      <Provider store={store}>
        <TodosReduxStack />
      </Provider>
    )
  }
}