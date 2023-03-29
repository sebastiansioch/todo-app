
import React from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import Todo from './Todo';
import { addDoc, collection, doc, onSnapshot, query, updateDoc, deleteDoc,  } from "firebase/firestore";
import { db } from './firebase';

const style = {
  bg:`h-screen w-screen p-4 bg-gradient-to-l from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-green-500 text-slate-100`,
  count: `text-center p-2`
}

function App() {
  const [todos,setTodos] = useState([]);
  const [input, setInput] = useState("")

const createTodo = async (e) => {
  e.preventDefault(e)
  if(input === "") {
    alert("Please enter a valid todo")
    return
  }
  await addDoc(collection(db, 'ToDo'), {
    text: input,
    completed: false
  })
  setInput("")
}

  useEffect (() => {
    const q = query(collection(db, 'ToDo'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr =[]
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()

  },[])

const completeTodo = async (todo) => {
  await updateDoc(doc(db, 'ToDo' , todo.id), {
    completed: !todo.completed
  })
}

const deleteTodo = async (id) => {
  await deleteDoc(doc(db,'ToDo', id))
}

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input 
          value={input} 
          onChange={(e) => setInput(e.target.value) } 
          className={style.input} 
          type="text" 
          placeholder="Add Todo" 
          />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo 
            key={index} 
            todo={todo} 
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <p className={style.count} >You have {todos.length} todos</p>
      </div>
      
      
    </div>
  );
}

export default App;
