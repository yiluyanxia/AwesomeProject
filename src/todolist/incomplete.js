import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

export default class IncompleteScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Incomplete!</Text>
      </View>
    );
  }
}