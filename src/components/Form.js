import React, { useState, useEffect } from "react";

function Form(props) {
    let handler;
    const [name, setName] = useState("");
    
    function handleChange(e) {
        setName(e.target.value);
     }
     
    function handleSubmit(e) {
        e.preventDefault();

        if (name.trim() === '') {
            console.error('Task name cannot be empty');
            return;
        }

        fetch("http://localhost:2000/task/create-task", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "task_name":name}),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseData => {
               
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error);
            });
        
            
        setName("");
    }

    useEffect(() => {
        
      
      }, [handler]);

    
    return (
        
        <form action="" onSubmit={handleSubmit}>

            <h2 className="label-wrapper">
                <label htmlFor="new-todo-ip" className='label_wrap'>
                    What needs to be done?
                </label>
            </h2>
            <input type="text"
                id="new-todo-input"
                className="input__lg"
                name="text"
                value={name}
                onChange={handleChange}
                autoComplete="off" />
            <button type='submit' className="btn btn__primary btn__lg">Add</button>

        </form>
    )

}

export default Form;