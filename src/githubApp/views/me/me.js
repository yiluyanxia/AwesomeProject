import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Me extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={()=>{
          this.props.navigation.navigate('CustomTag',{isRemove:false})}}>tap me to CustomTag</Text>
        <Text onPress={()=>{
          this.props.navigation.navigate('SortTag')}}>tap me to sortTag</Text>
        <Text onPress={()=>{
          this.props.navigation.navigate('CustomTag',{isRemove:true})}}>tap me to RemoveTag</Text>
      </View>
    );
  }
}



export default Me;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  }
})
