import React, { useState, useEffect } from "react";
import './App.css';
import Todo from './components/Todo';
import './components/Todo.css';
import Form from './components/Form';
import FilterBtn from './components/FilterBtn'
import { nanoid } from "nanoid";

const FILTER_MAP = {
  "All": () => true,
  "Active": (task) => task.completed === false,
  "Completed": (task) => task.completed === true,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a data fetching operation
        const response = await fetch('http://localhost:2000/task/read-Alltask');
        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, [data]);

  // console.log(tasks);

  // function addTask(name) {
  //   const newTask = { id: `todo-${nanoid()}`, name, completed: false };
  //   setTasks([...tasks, newTask]);
  // }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      
      // if (task.completed){
      //   $("#"+task._id).attr("checked","checked");
      // }
      // else{
      //   $("#"+task._id).removeAttr("checked");
      // }

      if (id === task._id){
        fetch(`http://localhost:2000/task/update-task/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "completed":!task.completed}),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseData => {
              setData(Math.floor(Math.random() * 101).toString());
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error);
            });
        return { ...task, completed: !task.completed };
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    console.log(id)
    console.log(newName)
    const editedTaskList = tasks.map((task) => {
      if (id === task._id) {
        fetch(`http://localhost:2000/task/update-task/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "task_name":newName}),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseData => {
              setData(Math.floor(Math.random() * 101).toString());
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error);
            });
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task._id);
    fetch(`http://localhost:2000/task//delete-task/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseData => {
              // setData(Math.floor(Math.random() * 101).toString());
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error);
            });
    setTasks(remainingTasks);
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterBtn 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));
  


  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task, index) => (
    <Todo id={task._id}
      name={task.task_name}
      completed={task.completed}
      key={index}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask} />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // console.log(data)
  
  return (
    
    <div className="App">

      <div className="todoapp container">
        <h1 className='title'>TodoMatic</h1>
        <Form />
        <div className="btn-group">
          {filterList}
        </div>

        <h2 id="list-heading">{headingText}</h2>
        <ul className="todo-list">
          {taskList}
        </ul>

      </div>

    </div>
  );
}

export default App;
