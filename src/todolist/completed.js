import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Alert,
  AsyncStorage
} from 'react-native';
import TodoItem from './todoItem'
import Utils from './utils/utils'
export default class CompletedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolistData: [],
      completedData: []
    }
  }

  componentDidMount() {
    this._getTodolistData();
  }
  componentWillReceiveProps(){
    this._getTodolistData();
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
      let todoListFilter= Utils.filterArr(todoListArr);
      this.setState({
        completedData: todoListFilter[true]
      })
    })
  }
  
  render() {
    
    let todoList = this.state.completedData
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={todoList}
          keyExtractor = {(item, index) => item.id.toString()}
          renderItem={({item,index}) => 
            <TodoItem dataItem={item} checkTodo={(item)=>Utils._checkTodo(item, this.state.todolistData)} 
              deleteTodo={(item) => {
              Utils._deleteTodo(item, this.state.todolistData)
              this._getTodolistData()
            }}/>
         }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  }
})