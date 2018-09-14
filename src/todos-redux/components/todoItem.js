import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class TodoItem extends Component{
  _checkTodo(){
    this.props.checkTodo
  }
  render (){
    const {checkTodo, completed, content } = this.props
    return (
      <View style={styles.todoitem}>
        <TouchableOpacity underlayColor="#90CAF9" onPress={checkTodo}>
          <Ionicons name={completed? "md-checkbox":"md-square-outline"} size={34} style={completed? styles.colorOff:styles.colorOn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={completed? styles.itemtxtOff:styles.itemtxt}>{content}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default TodoItem;

const styles = StyleSheet.create({
  todoitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
  },
  colorOn:{
    color:"#F50057"
  },
  colorOff:{
    color:"#e0e0e0"
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