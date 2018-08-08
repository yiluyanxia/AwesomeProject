import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 FlatList,
 TouchableOpacity,
 AsyncStorage,
 DeviceEventEmitter
} from 'react-native';
import TodoItem from './todoItem'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utils from './utils/utils';

export default class AllScreen extends Component {
  constructor(props){  
    super(props);   
    this.state = {  
      todolistData: [],
    }  
  }  

  componentDidMount() {
    this._getTodolistData();
    this.listener = DeviceEventEmitter.addListener('todolist_add',()=>{
      this._getTodolistData();
    })
  }
  componentWillReceiveProps(){
    this._getTodolistData();
  }
  componentWillUnmount(){
    if(this.listener){
      this.listener.remove();
    }
  }
  _getTodolistData(){
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoListArr = (result != null) ? JSON.parse(result) :[];
      this.setState({
        todolistData: todoListArr
      })
    })
  }

  _navigationAdd = () => {
    this.props.navigation.navigate('Add');
  };

  render() {
    let todoList = this.state.todolistData
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={todoList}
          keyExtractor = {(item, index) => item.id.toString()}
          renderItem={({item,index}) => <TodoItem dataItem={item} key={item.id} checkTodo={(item)=>Utils._checkTodo(item,this.state.todolistData)} deleteTodo={(item) => {
            Utils._deleteTodo(item, this.state.todolistData)
            this._getTodolistData()
          }} /> }
        />
        <TouchableOpacity style={styles.addBtn} onPress={this._navigationAdd}>
          <Ionicons name="md-add" size={38} color="#fff" />
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  addBtn:{
    position: "relative",
    left: 10,
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#FF4081",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
})
