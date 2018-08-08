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
import Utils from './utils/utils'

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      todo: 
        {
          id: "",
          content: "",
          isComplete: false
        },
        todoArr:[]
    };
  }

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
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoArr = (result != null) ? JSON.parse(result) :[]
      this.setState({
        todoArr: todoArr
      })
    })
  }
 
  _saveTodo = () => {
    const todoVal = this.state.todo
    this.setState({todoArr: this.state.todoArr.push(todoVal)})
    AsyncStorage.setItem('todolistData', JSON.stringify(this.state.todoArr), ()=>{
      // Alert.alert("_saveTodo setItem");
      });
    DeviceEventEmitter.emit('todolist_add')
    this.props.navigation.goBack();
  }

  _changeTodo(text){
    let _id = Utils.uniqueId()
    this.setState({
      todo:{
        id:_id,
        content:text,
        isComplete:false
      } 
    })
  }

  render(){
    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> {this._changeTodo(text)} }
          value={this.state.todo.content}
          multiline = {true}
          numberOfLines = {4}
          textAlignVertical="top"
          placeholder="add a todo"
          autoFocus={true}
        />
        {/* <Text>{JSON.stringify(this.state.todo)}</Text> */}
      </View>
    )
  }
}

export default Add;

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