import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import localforage from 'localforage';

function App() {

  useEffect (() => {
    localforage.getItem("tasks", (err,tasks) => {
      if (tasks) {
        setTasks(tasks);

      }

    })
  })


  const [task, setTask] = useState({name:"", completed: false});
  const [tasks,setTasks] = useState([]);
  const getTask = () => {
    return tasks.map((task, index) => <li 
    key={index}
    className={task.completed? "list-group-item list-group-item-success" : "list-group-item list-group-item-danger"}
    onClick={() =>{updateTask(index)}}
    onDoubleClick={() =>{deleteTask(index)}}>{task.name}</li>)

  }
  const storeTasks = (tasks) => {
    setTasks(tasks);
    localforage.setItem("tasks",tasks, (err) => {
      console.log("tasks saved");
    })

  }
  const updateTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1,{name:newTasks[i].name, completed:!newTasks[i].completed});
    storeTasks(newTasks);
    
  }
  const deleteTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    storeTasks(newTasks);
    
  }
  const addTask = (t) => {
    if (t){
      const newTasks = [...tasks];
      newTasks.push({name:t, completed: false});
      storeTasks(newTasks);
      setTask({name:"", completed: false});
    }
    else{
      alert("enter valid value")
    }
  }
  return (
    <div className="App">
      <input class="form-control" type="text" onChange={(e) => {setTask(e.target.value)}}
      value={task.name} 
      placeholder="enter the task"></input>
      <button class="btn btn-success w-50"onClick={()=>{addTask(task)}}>Add Task</button>
      <ul class="list-group">
        {getTask()}
      </ul>
    </div>
  );
}

export default App;
