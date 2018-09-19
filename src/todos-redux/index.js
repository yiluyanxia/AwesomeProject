import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { TodosReduxStack } from './router'

import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/configureStore'
const { persistor, store } = configureStore()
export default class TodolistRedux extends Component {
  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TodosReduxStack />
          </PersistGate>
      </Provider>
    )
  }
}