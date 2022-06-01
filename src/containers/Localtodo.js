import {React,useReducer,useState,useEffect} from 'react';
import LocTodo from './LocTodo';

export const ACTIONS={
    ADD_TODO:'add-todo',
    TOGGLE_TODO:'toggle-todo',
    DELETE_TODO:'delete-todo',
    SHOW_EDIT:'show-edit',
    EDIT_TODO:'edit-todo',
    COMPLETED_TODO:'completed-todo',
    INCOMPLETE_TODO:'incomplete-todo',
    NORMAL_TODO:'normal-todo'
}



export default function Localtodo(){
    const [name,setName]=useState();
    const [editedname,setEditedname]=useState();

    const [activetodo,setActivetodo]=useState();
    const [completetodo,setCompletetodo]=useState();
    const [alltodo,setAlltodo]=useState();




function handleSubmit(e){
    e.preventDefault();
dispatch({type:ACTIONS.ADD_TODO, payload:{name:name}})
setName('');
}

function actingtodo(){
    let localdata=JSON.parse(localStorage.getItem('localtodo'));
    let newlocaldata=localdata.filter(n=>n.complete===false);
    setActivetodo(newlocaldata.length);
}

function incompletedtodo(){
    let localdata=JSON.parse(localStorage.getItem('localtodo'));
    let newlocaldata=localdata.filter(n=>n.complete===true);
    setCompletetodo(newlocaldata.length);
}

function alltodos(){
    let localdata=JSON.parse(localStorage.getItem('localtodo'));
    setAlltodo(localdata.length);
}


function done(){
    todos.map(todo=>(
       dispatch({type:ACTIONS.COMPLETED_TODO ,payload:{id:todo.id,complete:todo.complete}})
    ))
}

function activated(){
    todos.map(todo=>(
       dispatch({type:ACTIONS.INCOMPLETE_TODO ,payload:{id:todo.id,complete:todo.complete}})
    ))
}

function backnormal(){
    todos.map(todo=>(
        dispatch({type:ACTIONS.NORMAL_TODO ,payload:{id:todo.id,complete:todo.complete}})
    ))  
}
//-------------------Reducer---------------------------
const [todos,dispatch]=useReducer(reducer,[],()=>{
    let localdata=localStorage.getItem('localtodo');
    return localdata ? JSON.parse(localdata) : []
});


function reducer(todos,action){
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
//------------------------End Reducer--------------------




function newTodo(name){
    return {id:Date.now(),name:name,complete:false,filtered:'block',status:'none'}
}

    useEffect(()=>{
localStorage.setItem('localtodo',JSON.stringify(todos));
actingtodo();
incompletedtodo();
alltodos();
    },[todos])

return(
    <>
  <div className='holder'>

<header>
<h1>Todo List</h1>
</header>


<main>
<div className='infos'>
    <div className='card'>
    <div>
        <h2>{alltodo}</h2>
    </div>
    <div>
        <p>Total</p>
    </div>
    </div>

    <div className='card'>
    <div>
        <h2>{activetodo}</h2>
    </div>
    <div>
    <p>Active</p>
    </div>
    </div>

    <div className='card'>
    <div>
        <h2>{completetodo}</h2>
    </div>
    <div>
    <p>Completed</p>
    </div>

    </div>
</div>

<div className='todoses' >
{todos.map((todo=>{
return <LocTodo key={todo.id} editedname={editedname} setEditedname={setEditedname} todo={todo} dispatch={dispatch}  />
}))}
</div>
<div className='inputs'>

    <div className='filters'>
    <button onClick={backnormal}>All</button>
    <button onClick={done}>Completed</button>
    <button onClick={activated}>Active</button>
    </div>

    <div  className='todoadd'>
    <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Add todo' value={name} onChange={e=> setName(e.target.value)}/>
        <button>Add</button>
    </form>
    </div>
    <div className='credit'>
     <p>Coded by Steven Joseph</p>
     <p>Linkedin: <a href='https://www.linkedin.com/in/steven-joseph-6871a2237'>https://www.linkedin.com/in/steven-joseph-6871a2237</a></p>
    </div>

</div>
</main>


</div>
    </>
)

}
