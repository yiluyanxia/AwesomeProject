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

export default class CompletedScreen extends Component {
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
    let _this = this;
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoListArr = (result != null) ? JSON.parse(result) :'';
      let  todoListFilter= this.filterArr(todoListArr);
      _this.setState({
        todolistData: todoListFilter[true]
      })
      // Alert.alert("getItem success")
    })
  }


  _merge(i){
    
    
  }

  render() {
    
    let todoList = this.state.todolistData
    return (
      <View style={styles.wrapper}>
        <Button onPress={()=>this._remove} title="remove" />
        <FlatList
          data={todoList}
          keyExtractor = {(item, index) => item.id}
          renderItem={({item,index}) => <TodoItem content={item.content} isComplete={item.isComplete}  _merge={this._merge.bind(this,index)}/> }
        />
        
      </View>
    );
  }

  _remove(){
    AsyncStorage.removeItem('todolistData', () => {
      Alert.alert("remove success")
      
    });
  }



}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  }
})