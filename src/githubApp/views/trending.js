import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Trending extends Component {
  

  render() {
    return (
      <View style={styles.container}>
        <Text>this is Favorite</Text>
      </View>
    );
  }
}

export default Trending;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  }
})
