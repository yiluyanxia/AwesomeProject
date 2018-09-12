import React from 'react';
import { 
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AllList from './all'
import AddTodo from './add'
import Completed from './completed'
import Incomplete from './incomplete'


export const TodolistTabs = createBottomTabNavigator({
  All: {screen: AllList },
  Incomplete: {screen: Incomplete},
  Completed: {screen: Completed},
},
{
  navigationOptions:({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor}) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'All'){
        iconName = `ios-list-box${focused ? '' : '-outline'}`
      } else if(routeName === 'Completed'){
        iconName = `ios-flag${focused ? '' : '-outline'}`
      }else if(routeName === 'Incomplete'){
        iconName = `ios-create${focused ? '' : '-outline'}`
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />
      
    }
  }),
  tabBarOptions: {
    activeTintColor: '#FF4081',
    inactiveTintColor: '#455A64',
    labelStyle:{
      fontSize: 13,
    },
    style:{
      backgroundColor: '#fff',
    }
  },
})

export const TodolistStack = createStackNavigator({
  TodoTab: {
    screen: TodolistTabs,
    navigationOptions:{
      title:'Todo list'
    }
  },
  Add: {
    screen: AddTodo,
    navigationOptions:{
      title:'Add',
    }
  }
},
{
  navigationOptions: ({
    navigation
  }) => {
    return{
      headerStyle:{
        backgroundColor: '#FF4081',
        borderBottomColor: 'transparent',
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    }
  }
})

