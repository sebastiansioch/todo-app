import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState("");
  const [tasks,setTasks] = useState(["eat", "sleep"]);
  const getTask = () => {
    return tasks.map((task, index) => <li class="list-group-item"
    onClick={() =>{deleteTask(index)}}>{task}</li>)

  }
  const deleteTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
    
  }
  const addTask = (t) => {
    if (t){
      const newTasks = [...tasks];
      newTasks.push(t);
      setTasks(newTasks);
      setTask("");
    }
    else{
      alert("enter valid value")
    }
  }
  return (
    <div className="App">
      <input class="form-control" type="text" onChange={(e) => {setTask(e.target.value)}}
      value={task} 
      placeholder="enter the task"></input>
      <button class="btn btn-success w-50"onClick={()=>{addTask(task)}}>Change</button>
      <ul class="list-group">
        {getTask()}
      </ul>
    </div>
  );
}

export default App;
