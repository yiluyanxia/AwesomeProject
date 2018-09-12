let initState = [];
const todo = (state, action)=>{
  switch(action.type){
    case 'ADD_TODO':
      return{
        id: action.id,
        text:action.text,
        completed:false,
      }
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state
      }
      return Object.assign({},state,{completed:!state.completed})
    default:
      return state
  }
}

const todos = (state = initState, action)=>{
  switch(action.type){
    case 'ADD_TODO':
      return[
        ...state,
        todo(undefined,action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t=>todo(t,action))
      // return {
      //   ...state,
      //   items: state.items.map((todo) => {
      //     if(todo.id === action.id){
      //       return { ...todo, completed: !todo.completed}
      //     }
      //     return todo
      //   })
      // }
    default:
      return state
  }
}

export default todos