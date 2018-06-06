import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 TextInput,
 Button,
 Alert,
 TouchableOpacity,
 AsyncStorage,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      todo: 
        {
          id: "",
          content: "",
          isComplete:false
        },
        todoArr:[]
       
    };
  }


  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <TouchableOpacity style={{width: 56, height: 36, paddingRight:20}} onPress={params.saveTodo}>
          <Ionicons name="md-checkmark" size={36} color="#448AFF" />
        </TouchableOpacity>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ saveTodo: this._saveTodo });
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoListArr = (result != null) ? JSON.parse(result) :[];
      this.setState({todoArr:todoListArr})
      Alert.alert("getItem")
      
    })


  }
 
  _saveTodo = () => {
    let _this = this
    const todoVal = _this.state.todo
    _this.setState({todoArr: _this.state.todoArr.push(todoVal)})
    
    AsyncStorage.setItem('todolistData', JSON.stringify(_this.state.todoArr), ()=>{
      Alert.alert("_saveTodo setItem");
      });
  }

  _changeTodo(text){
    let _this = this;
    const _id = _this._genID(6)
    _this.setState({
      todo:{
        id:_id,
        content:text,
        isComplete:false
      } 
    })
    // Alert.alert("_changeTodo");

    

  }

  _genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
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
        <Text>{JSON.stringify(this.state.todo)}</Text>
        <Text>{JSON.stringify(this.state.todoArr)}</Text>
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
  },
  saveBtn: {
    width: 36,
    height: 36,
  }
})