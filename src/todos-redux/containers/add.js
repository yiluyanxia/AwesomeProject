import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 TextInput,
 Alert,
 TouchableOpacity,
 AsyncStorage,
 DeviceEventEmitter
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import {addTodo} from '../actions'

class Add extends Component {
  render(){
    let input 
    const {dispatch} = this.props
    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> {input = text }}
          multiline = {true}
          numberOfLines = {4}
          textAlignVertical="top"
          placeholder="add a todo"
          autoFocus={true}
        />
        <TouchableOpacity style={{width: 56, height: 36, paddingRight:20}} onPress={()=>dispatch(addTodo(input))}>
          <Ionicons name="md-checkmark" size={36} color="#FF4081" />
        </TouchableOpacity>
        {/* <Text>{JSON.stringify(this.state.todo)}</Text> */}
      </View>
    )
  }
}

export default connect()(Add)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  textInput: {
    color: "#333",
    padding: 0,
    fontSize: 18
  }
})