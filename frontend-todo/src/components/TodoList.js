import React, { Fragment, useState, useEffect } from "react";
import TodoEdit from "./TodoEdit";

const TodoList = () => {

     const [todos, setTodos] = useState([]);
     

     //delete todo function

     const deleteTodo = async(id) => {
         try{
            const deleteTodo = await fetch(`http://localhost:5000/api/todo/${id}`,{
                method: "DELETE"
            })
            console.log(deleteTodo)
            setTodos(todos.filter(todo => todo._id !== id))

            
         }catch(err){
            console.error(err.message)
         }
     }

     //get todo
    const getTodos = async () =>{
        try{
            const response = await fetch('http://localhost:5000/api/todo')
            const jsonData = await response.json();
            setTodos(jsonData);
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos)
    return (
        <Fragment>
        
  <h3 className="mt-3 text-center">List Of Todo</h3>
  
  <table className="table mt-4 table-dark text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody> 
      {todos.map(todo => {
          return <tr key={todo._id}>
          <td>{todo.description}</td>
          <td><TodoEdit todo={todo}/></td>
          <td><button className ="btn btn-danger" onClick={() => deleteTodo(todo._id)}>delete</button></td>
        </tr>
      })}
    </tbody>
  </table>

        </Fragment>
    )
}


export default TodoList;