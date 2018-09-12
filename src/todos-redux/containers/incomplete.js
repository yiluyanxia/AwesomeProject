import {connect} from 'react-redux'
import TodoList from '../components/todoList'
import {toggleTodo} from '../actions'

const mapStateToprops = (state) => {
  return {
    todos: state.todos.filter(t => !t.completed)
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(TodoList)
