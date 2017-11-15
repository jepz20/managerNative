/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'
import firebase from 'firebase'
import Router from './src/Router'

export class App extends Component {
  componentWillMount () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCNqoQbrBCRQcelp5LWlX9LEGu4UkcA2-I',
      authDomain: 'managerjepz.firebaseapp.com',
      databaseURL: 'https://managerjepz.firebaseio.com',
      projectId: 'managerjepz',
      storageBucket: '',
      messagingSenderId: '828991672666'
    })
  }
  render () {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
        <Router />
      </Provider>
    )
  }
}

export default App
