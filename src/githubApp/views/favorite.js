import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Favorite extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>this is Favorite</Text>
        <WebView
        source={{uri: 'https://www.qianpen.com/front/financing/money-plan/index'}}
        style={{marginTop: 20}}
      />
      </View>
    );
  }
}



export default Favorite;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  }
})
