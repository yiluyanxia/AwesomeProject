import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataRepository from '../network/DataRepository'



class HomeView extends Component {
  static navigationOptions = {
    title: 'RN practice',
  };

  render() {
    return (
      <View style={styles.container}>
      
     </View>
    );
  }
}



export default HomeView;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  }
})
