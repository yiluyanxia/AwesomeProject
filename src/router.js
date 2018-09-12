import React from 'react';
import { 
  createStackNavigator
} from 'react-navigation';

import HomeScreen from './home'
import GithubApp from './githubApp'
import {TodolistStack} from './todolist/router'
import TodosRedux from './todos-redux/index'
import Counter from './counter'

export const RootStack = createStackNavigator({
  Home: HomeScreen,
  GithubApp: GithubApp,
  Todolist: {
    screen: TodolistStack,
  },
  TodosRedux: TodosRedux,
  Counter: Counter
},
{
  mode: 'modal',
  headerMode: 'none',
});

