import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 TextInput,
 TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import {addTodo} from '../actions'

var content
class Add extends Component {
  
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <TouchableOpacity style={{width: 56, height: 36, paddingRight:20}} onPress={params.saveTodo}>
          <Ionicons name="md-checkmark" size={36} color="#fff" />
        </TouchableOpacity>
      ),
    };
  };
  componentWillMount() {
    this.props.navigation.setParams({ saveTodo: this._saveTodo })
  }
  _saveTodo = () => {
    this.props.dispatch(addTodo(content))
    this.props.navigation.goBack();
  }

  render(){
    const {dispatch} = this.props
    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> {content = text }}
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