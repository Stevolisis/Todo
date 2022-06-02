import ACTIONS from './Actions'



function newTodo(name){
    return {id:Date.now(),name:name,complete:false,filtered:'block',status:'none'}
}

export default function reducer(todos,action){
switch(action.type){
    case ACTIONS.ADD_TODO:
       return [...todos,newTodo(action.payload.name)]

    case ACTIONS.TOGGLE_TODO:
       return todos.map(todo=>{
         if(todo.id===action.payload.id){
       return {...todo,complete: !todo.complete}
            }
       return todo
            })

    case ACTIONS.DELETE_TODO:
        return todos.filter(todo=> todo.id !== action.payload.id)

        case ACTIONS.SHOW_EDIT:
            return todos.map(todo=>{
              if(todo.id===action.payload.id){
                    return {...todo,status: todo.status==='block' ? 'none' :'block'}
                }
              return todo
                   })

    case ACTIONS.EDIT_TODO:
        return todos.map(todo=>{
            if(todo.id===action.payload.id){
                return {...todo,name: action.payload.name,status:'none'}
            }
        return todo
               })

    case ACTIONS.COMPLETED_TODO:
        return todos.map(todo=>{
            if(todo.id===action.payload.id){
                return {...todo,filtered:todo.complete===true?'block':'none'}
            }
        return todo
               })
    case ACTIONS.INCOMPLETE_TODO:
        return todos.map(todo=>{
            if(todo.id===action.payload.id){
                return {...todo,filtered:todo.complete===false?'block':'none'}
            }
        return todo
               })

    case ACTIONS.NORMAL_TODO:
        return todos.map(todo=>{
            if(todo.id===action.payload.id){
                return {...todo,filtered:'block'}
            }
                return todo
                })
               
      default:
        return todos
}

}