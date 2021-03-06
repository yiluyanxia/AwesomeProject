import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';
import { createStackNavigator  } from 'react-navigation';

class HomeScreen extends Component {
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}

class DetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => this.props.navigation.push('Details')}
      />
      <Button
        title="Go to Home"
        onPress={() => this.props.navigation.navigate('Home')}
      />
      <Button
        title="Go back"
        onPress={() => this.props.navigation.goBack()}
      />
    </View>
    );
  }
}


const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
},
{
  initialRouteName: 'Home',
}
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}


