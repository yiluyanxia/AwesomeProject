import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 Switch,
 Alert,
 TouchableHighlight,
 AsyncStorage
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class TodoItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.isComplete,
    }
  }

  _mergeSwitch(){
    this.setState(previousState => {
      return { switchValue: !previousState.switchValue };
    });
    this.props._merge()
  }

  
  // onPress={this.addClick.bind(this)}
  // <Switch
  // onValueChange={(value) => {
  //   this.setState({switchValue: value})
  //   this._mergeSwitch.bind(this)
  //   }
  // }
  
  render (){
    return (
      <View style={styles.todoitem}>
        <TouchableHighlight  underlayColor="#90CAF9" onPress={
          this._mergeSwitch.bind(this)
         }>
          <Ionicons name={this.state.switchValue? "md-checkbox-outline":"md-checkbox"} size={34} style={this.state.switchValue? styles.colorOn:styles.colorOff} />
          
        </TouchableHighlight>
      
        <Text style={this.state.switchValue? styles.itemtxt:styles.itemtxtOff} onPress={this.handleSettingsPress}>{this.props.content}</Text>

        
        
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
    color:"#2196F3"
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