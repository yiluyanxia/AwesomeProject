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

export default class IncompleteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolistData:[]
    }
  }

  filterArr(dataArr) {
    var list = dataArr, data = [];
    for (var i = 0; i < list.length; i++) {
      if (!data[list[i].isComplete]) {
        var arr = [];
        arr.push(list[i]);
        data[list[i].isComplete] = arr;
      } else {
        data[list[i].isComplete].push(list[i])
      }
    }
    return data;
  }

 
  componentDidMount() {
    this._getTodolistData();
  }

  componentWillReceiveProps(){
    this._getTodolistData();
  }
  
  _getTodolistData(){
    let _this = this;
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoListArr = (result != null) ? JSON.parse(result) :[];
      let  todoListFilter= this.filterArr(todoListArr);
      _this.setState({
        todolistData: todoListFilter[false]
      })
      
    })
  }



  _merge(i){
    let _this = this
    const todolistData = _this.state.todolistData;
    todolistData[i].isComplete = !todolistData[i].isComplete
    _this.setState(preState => ({
      todolistData:[...preState.todolistData]
    }))

    let mergeVal = _this.state.todolistData;
   
    AsyncStorage.setItem('todolistData', JSON.stringify(mergeVal), ()=>{
      Alert.alert("savemerge success");
      // AsyncStorage.mergeItem('todolistData',JSON.stringify(mergeVal), () =>{
        
      // })
    });
  }

  render() {
    let todoList = this.state.todolistData
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={todoList}
          keyExtractor = {(item, index) => item.id}
          renderItem={({item, index}) => <TodoItem content={item.content} isComplete={item.isComplete} _merge={this._merge.bind(this,index)} /> }
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