import Utils from '../utils/utils'

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: Utils.uniqueId(),
    content: text
  }
}

export const toggleTodo = (id) => {
  return{
    type:'TOGGLE_TODO',
    id
  }
}
