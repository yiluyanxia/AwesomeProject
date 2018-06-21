import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FLAG_LANGUAGE } from '../../util/LanguageUtil';

class Me extends Component {

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <Text onPress={()=>{
          navigate('CustomTag',{isRemove:false,flag:FLAG_LANGUAGE.flag_key})}}>tap me to CustomTag</Text>

        <Text onPress={()=>{
          navigate('CustomTag',{isRemove:false,flag:FLAG_LANGUAGE.flag_language})}}>tap me to Custom Language</Text>

        <Text onPress={()=>{
          navigate('SortTag',{flag:FLAG_LANGUAGE.flag_key})}}>tap me to sortTag</Text>

        <Text onPress={()=>{
          navigate('SortTag',{flag:FLAG_LANGUAGE.flag_language})}}>tap me to sort Language</Text>

        <Text onPress={()=>{
          navigate('CustomTag',{isRemove:true})}}>tap me to RemoveTag</Text>
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
