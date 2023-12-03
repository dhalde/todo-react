import React, { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");


  function handleChange(e) {
    setNewName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(newName)
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Update Task: {props.name}
        </label>
        <input 
        id={props.id} 
        className="input__lg" type="text"
        onChange={handleChange} />
      </div>
      <div className="btn-group">
        <button type="button" 
        className="btn todo-cancel editdel_btn" 
        onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit" 
        className="btn btn__primary todo-edit  editdel_btn" >
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <> 
  <div className="c-cb">
  <input
    id={props.id}
    type="checkbox"
    checked={props.completed}
    onChange={() => props.toggleTaskCompleted(props.id)} />
  <label id={props.id+"abc"} className="todo-label" htmlFor={props.id}>
    {props.name}
  </label>
</div>
<div className="btn-group">
  <button type="button" 
  className="btn editdel_btn" 
  onClick={() => setEditing(true)}>
    Edit
  </button>
  <button type="button"
   className="btn btn__danger editdel_btn"
   onClick={() => props.deleteTask(props.id)}>
    Delete
  </button>
</div>
</>)

  return (
  
      <li className="todo">
        {isEditing ? editingTemplate : viewTemplate}
      </li>
  


  );
}

export default Todo;