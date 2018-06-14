import React from 'react';
import { 
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Splash from './views/splash'
import Wellcome from './views/wellcome'

import Popular from './views/popular'
import Trending from './views/trending'
import Favorite from './views/favorite'
import Me from './views/me/me'
import CustomTag from './views/me/customTag'
import SortTag from './views/me/sortTag'


export const GithubTabs = createBottomTabNavigator({
  Popular:{
    screen: Popular
  },
  Trending:{
    screen: Trending
  },
  Favorite:{
    screen: Favorite
  },
  Me:{
    screen: Me
  }
},{
  navigationOptions:({ navigation }) => ({
    tabBarIcon:({ focused, tintColor}) =>{
      const { routeName } = navigation.state;
      let iconName;
      if(routeName === 'Popular'){
        iconName = `ios-flame${focused ? '' : '-outline'}`
      }else if(routeName === 'Trending'){
        iconName = `ios-bonfire${focused ? '' : '-outline'}`
      }else if(routeName === 'Favorite'){
        iconName = `md-heart${focused ? '' : '-outline'}`
      }else if(routeName === 'Me'){
        iconName = `ios-person${focused ? '' : '-outline'}`
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />
  
    }
  }),
  tabBarOptions:{
    activeTintColor: '#6570e2',
    inactiveTintColor: '#455A64',
    labelStyle:{
      fontSize: 13,
    },
    style:{
      backgroundColor: '#fff',
    }
  }
})

export const GithubStack = createStackNavigator({
  GithubTabs:{
    screen: GithubTabs,
    navigationOptions:{
      title:'Github App',
    }
  },
  CustomTag:{
    screen: CustomTag,
    navigationOptions:{
      title:'Custom Tag',
    }
  },
  SortTag:{
    screen: SortTag,
    navigationOptions:{
      title:'SortTag Tag',
    }
  }
},{
  navigationOptions:({navigation})=>({
    headerStyle:{
      backgroundColor:'#6570e2'
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      flex:1,
      textAlign:'center'
    }
  })
})
export const AppStack = createStackNavigator({
  Splash: {
    screen: Splash,
  },
  Wellcome: {
    screen: Wellcome,
  },
  GithubStack: {
    screen: GithubStack
  },
},
{
  initialRouteName: 'Splash',
  mode: 'card',
  headerMode: 'none',
})

