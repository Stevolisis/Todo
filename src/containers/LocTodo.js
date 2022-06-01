import {React} from 'react'
import {ACTIONS} from './Localtodo'
import 'font-awesome/css/font-awesome.min.css';

export default function LocTodo({todo,editedname,setEditedname,dispatch}){

    return(
        <>
<div className='todo' style={{display:todo.filtered}}>

<div className='todosub1' 
style={{
    background:todo.complete ? 'gray' : '#001b29' ,
    color:todo.complete ? 'lightGray' : '#fafafa',
    textDecoration:todo.complete ? 'line-through' : 'none'
    }}>

<div className='value'>
    <input type='checkbox' checked={todo.complete ? true : false} onChange={()=>dispatch({type:ACTIONS.TOGGLE_TODO ,payload:{id:todo.id}})}/>
    <p>{todo.name}</p>
</div>

<div className='icons'>
<i className='fa fa-edit' onClick={()=>dispatch({type:ACTIONS.SHOW_EDIT ,payload:{id:todo.id}})}></i>
<i className='fa fa-trash' onClick={()=>dispatch({type:ACTIONS.DELETE_TODO ,payload:{id:todo.id}})}></i>
</div>
</div>

<div className='todosub2' style={{display:todo.status}}>
<form>
    <input type='text' placeholder='Edit Todo' onChange={f=> setEditedname(f.target.value)}/>
    <button onClick={(e)=>{
     e.preventDefault();
    dispatch({type:ACTIONS.EDIT_TODO, payload:{id:todo.id,name:editedname}})}}>Edit</button>
</form>
</div>
</div>

</>
    )
}
