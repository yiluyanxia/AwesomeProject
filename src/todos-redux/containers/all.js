import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import {toggleTodo} from '../actions'
import TodoList from '../components/todoList'
class AllScreen extends Component {
  _navigationAdd = () => {
    this.props.navigation.navigate('Add');
  };
  
  render() {
    const { todos, onTodoClick } = this.props
    return (
      <View style={styles.wrapper}>
        <TodoList todos={todos} onTodoClick={onTodoClick} />
        <TouchableOpacity style={styles.addBtn} onPress={this._navigationAdd}>
          <Ionicons name="md-add" size={38} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToprops = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(AllScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
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
