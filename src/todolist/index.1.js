import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text
} from 'react-native';

import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import Completed from './completed'
import Incomplete from './incomplete'

class Todolist extends Component {
 
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title','title'),
      // title: `${navigation.state.params.title}'`,
      headerStyle: {
        backgroundColor: '#448AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render() {
    const {params} = this.props.navigation.state;

    return (
      <View style={styles.wrapper}>
        <Text>{params.title}</Text>
      </View>

    )
  }
}



const MainScreenNavigator = createBottomTabNavigator({
  Completed: {screen: Completed},
  Incomplete: {screen: Incomplete}
})

class NavigatorWrappingScreen extends Component {
  render() {
    return (
      <View style = {{flex: 1}}>
       
        <MainScreenNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;


const TodolistApp = createStackNavigator({
  Home: { screen: NavigatorWrappingScreen}
},
{
  mode: 'modal',
  headerMode: 'none',
});

export default class App extends Component {
  render(){
    return <TodolistApp />
  }
}



// export default createBottomTabNavigator({
//   Home: Todolist,
//   Completed: Completed,
// })

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  }

})