import React, { useState } from 'react';
import axios from 'axios';

const Inputs = ({ onTaskCreated }) => {
  const [task, setTask] = useState('');

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (task.trim() !== '') {
      axios.post('http://localhost:1337/tasks', {
        task: task,
        done: 0, // Default value for 'done' field
      })
      .then((response) => {
        console.log('Task created successfully:', response.data);
        setTask('');
        onTaskCreated(response.data); // Notify parent component about task creation
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
    }
  };

  return (
    <div>
      <form className="container">
        <div className="input-container">
          <div className="input-content">
            <div className="input-dist">
              <div className="input-type">
                <input
                  placeholder="please write a task here.."
                  required=""
                  type="text"
                  className="input-is"
                  value={task}
                  onChange={handleTaskChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="button" onClick={handleCreateTask}>
          Validate
        </button>
      </form>
    </div>
  );
};

export default Inputs;
