let initState = [];
const todos = (state = initState, action)=>{
  switch(action.type){
    case 'ADD_TODO':
      return[
        ...state,
        {
          id: action.id,
          content: action.content,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map((t) => {
         if (t.id !== action.id) {
          return t
         } 
         return Object.assign({},t,{completed:!t.completed})
        })
      
    default:
      return state
  }
}

export default todos