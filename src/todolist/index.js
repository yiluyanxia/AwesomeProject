import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 Switch,
 Button,
 FlatList,
 Alert,
 AsyncStorage
} from 'react-native';
import TodoItem from './todoItem'



class All extends Component {
  constructor(props){  
    super(props);   
    this.state = {  
      todolistData:[
        {
          id:1,
          content: "哈哈哈哈哈哈",
          isComplete: true
        },
        {
          id:2,
          content: "呵呵呵呵呵呵",
          isComplete: false
        },
        {
          id:3,
          content: "嘿嘿嘿嘿嘿嘿",
          isComplete: false
        }
      ],
      AsyncStorageVal:{
        content: "嘿嘿嘿嘿嘿嘿",
        
      }  
    }  
  }  


  _save(){
    let _this = this;
    let tdVal =  _this.state.todolistData
    // let tdVal =  { todolist: _this.state.todolistData}
    AsyncStorage.setItem('todolistData', JSON.stringify(tdVal), ()=>{
      Alert.alert("save success");
      AsyncStorage.mergeItem('todolistData',JSON.stringify(tdVal), () =>{
        Alert.alert("merge success")
      })
    });
  }


  render() {
    
    return (
      <View style={styles.wrapper}>
        <Button onPress={()=> this._save()} title="click to save"/>
        <FlatList
          data={this.state.todolistData}
          keyExtractor = {(item, index) => item.id.toString()}
          renderItem={({item}) => <TodoItem content={item.content} isComplete={item.isComplete} /> }
        />
        
      </View>

    )
  }

}

export default All;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  todoitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
  },
  itemtxt:{
    fontSize: 30,
    color: "#000"
    
  },
  itemtxtOff:{
    fontSize: 30,   
    color: "#666"
  }

})
