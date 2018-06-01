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

 

  componentDidMount() {
    let _this = this;
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      _this.setState({
        todolistData: (result != null) ? JSON.parse(result) :''
      })
      Alert.alert("getItem success")
    })
  }

  render() {
    
    let todoList = this.state.todolistData
    return (
      <View style={styles.wrapper}>
        <Button onPress={()=>this._remove} title="remove" />
        <FlatList
          data={todoList}
          keyExtractor = {(item, index) => item.id}
          renderItem={({item}) => <TodoItem content={item.content} isComplete={item.isComplete} /> }
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