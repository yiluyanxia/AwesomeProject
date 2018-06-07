import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


class Splash extends Component {
  
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
     <View style={styles.container}>
      <Ionicons name="logo-github" color="#fff"  size={80} />
     </View>
    );
  }
}



export default Splash;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#24292e",
   justifyContent: 'center',
   alignItems: 'center',
  }
})
