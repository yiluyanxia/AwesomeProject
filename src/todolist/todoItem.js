import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class TodoItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.dataItem.isComplete,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setCompleteState(nextProps.dataItem.isComplete)
  }
  setCompleteState(isComplete){
    this.setState({
      switchValue: isComplete
    })
  }
  _onSwitch(){
    this.setCompleteState(!this.state.switchValue)
    this.props.checkTodo(this.props.dataItem)
  }
 
  _showModel(todo){
    Alert.alert(
      'Delete it ?',
      todo.content,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.props.deleteTodo(todo)},
      ],
      { cancelable: false }
    )
  }
  render (){
    return (
      <View style={styles.todoitem}>
        <TouchableHighlight  underlayColor="#90CAF9" onPress={
          this._onSwitch.bind(this)
         }>
          <Ionicons name={this.state.switchValue? "md-checkbox":"md-square-outline"} size={34} style={this.state.switchValue? styles.colorOff:styles.colorOn} />
        </TouchableHighlight>
        <TouchableOpacity onLongPress={()=>{ this._showModel(this.props.dataItem)}} >
          <Text style={this.state.switchValue? styles.itemtxtOff:styles.itemtxt} onPress={this.handleSettingsPress}>{this.props.dataItem.content}</Text>
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