// import Utils from '../utils/utils'
let nexrTodoId = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nexrTodoId++,
    text: text
  }
}

export const setVisibility =(filter)=>{
  return{
    type: 'SET_VISIBILITY',
    filter
  }
}

export const toggleTodo = (id) => {
  return{
    type:'TOGGLE_TODO',
    id
  }
}