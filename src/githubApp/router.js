import React from 'react';
import { 
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Wellcome from './views/wellcome'
import Popular from './views/popular'
import Splash from './views/splash'

export const GithubStack = createStackNavigator({
  Splash: {
    screen: Splash,
  },
  Wellcome: {
    screen: Wellcome,
  },
  Popular: {
    screen: Popular,
  }
},
{
  initialRouteName: 'Splash',
  mode: 'card',
  headerMode: 'none',
})