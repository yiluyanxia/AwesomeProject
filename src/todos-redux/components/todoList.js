import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 FlatList,
 TouchableOpacity,
} from 'react-native';
import TodoItem from '../components/todoItem'
import Ionicons from 'react-native-vector-icons/Ionicons';

class TodoList extends Component {

  render() {
    const { todos, onTodoClick } = this.props
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={todos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem={({item}) => <TodoItem  key={item.id} checkTodo={() => onTodoClick(item.id)} 
          {...item}/> }
        />
      </View>
    )
  }
}

export default TodoList

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  }
})
