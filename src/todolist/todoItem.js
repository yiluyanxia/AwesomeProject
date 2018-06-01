import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 Switch,
} from 'react-native';

class TodoItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.isComplete,
    }
  }
 
  render (){
    return (
      <View style={styles.todoitem}>
        <Text style={this.state.switchValue? styles.itemtxt:styles.itemtxtOff}>{this.props.content}</Text>
        <Switch
          onValueChange={(value) => this.setState({switchValue: value})}
          value={this.state.switchValue} />
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
  itemtxt:{
    fontSize: 30,
    color: "#000"
    
  },
  itemtxtOff:{
    fontSize: 30,   
    color: "#666"
  }

})