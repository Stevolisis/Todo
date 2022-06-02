import {React,useReducer,useState,useEffect} from 'react';
import ACTIONS from './Actions'
import LocTodo from './LocTodo';
import reducer from './reducer'



export default function Localtodo(){
    const [name,setName]=useState("");
    const [editedname,setEditedname]=useState("");

    const [activetodo,setActivetodo]=useState();
    const [completetodo,setCompletetodo]=useState();
    const [alltodo,setAlltodo]=useState();

function handleSubmit(e){
    e.preventDefault();
dispatch({type:ACTIONS.ADD_TODO, payload:{name:name}})
setName('');
}


function alltodos(){
    let localdata=JSON.parse(localStorage.getItem('localtodo'));
    setAlltodo(localdata.length);
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





//-------------------Setting reducer---------------------------
const [todos,dispatch]=useReducer(reducer,[],()=>{
    let localdata=localStorage.getItem('localtodo');
    return localdata ? JSON.parse(localdata) : []
});
//------------------------End Setting reducer--------------------




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
        <input required='required' type='text' placeholder='Add todo' value={name} onChange={e=> setName(e.target.value)}/>
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
