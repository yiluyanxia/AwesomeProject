import React,{Component} from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View
} from 'react-native';
import { 
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
// import TabNavigation from './TabNavigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button 
          onPress={() => navigate('Chat',{user:'Key'})}
          title="Chat with Kris"
          />
      </View>
    );
  }
}

class ChatScreen extends Component {
  // static navigationOptions = {
  //   title:'Chat with Kris'
  // }
  static navigationOptions = ({navigation}) => ({
    title:`Chat with ${navigation.state.params.user}`,
  })
  render(){
    const {params} = this.props.navigation.state;

    return(
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    )
  }
}


class RecentChatsScreen extends Component{
  render(){
    return(
      <View>
        <Text>List of recent chats</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Kris' })}
          title="Chat with Kris"
          />
      </View>
      
    )
  }
}

class AllContactsScreen extends Component{
  render(){
    return(
      <View>
        <Text>List of all chats</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Kris' })}
          title="Chat with Kris"
          />
      </View>
    )
  }
}


const MainScreenNavigator = createBottomTabNavigator({
  Recent: {screen: RecentChatsScreen},
  All: {screen: AllContactsScreen}
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

// const SimpleApp = createStackNavigator({
//   Home: { screen: HomeScreen },
//   Chat: {
//     screen:ChatScreen
//   }
// });

// const SimpleApp = createStackNavigator({
//   Home: { screen: MainScreenNavigator,
//     navigationOptions:{
//       title:'My Chats'
//     }
//   },
//   Chat: {
//     screen:ChatScreen
//   }
// });

const SimpleApp = createStackNavigator({
  Home: { screen: NavigatorWrappingScreen ,
    navigationOptions:{
      title:'My Chats'
    }
  },
  Chat: {
    screen:ChatScreen
  }
});

export default class App extends Component {
  render(){
    return <SimpleApp />
  }
}


// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);