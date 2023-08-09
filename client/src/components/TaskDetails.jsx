import React from 'react';
import axios from 'axios';
import Complete from './Complete.jsx';

const TaskDetails = (props) => {
  const handleRemoveTask = () => {
    axios
      .delete(`http://localhost:1337/tasks/${props.element.id}`)
      .then(() => {
        props.onTaskRemoved(props.element.id);
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleToggleDone = () => {
    const updatedTask = {
      ...props.element,
      done: !props.element.done,
    };

    axios
      .put(`http://localhost:1337/tasks/${props.element.id}`, updatedTask)
      .then(() => {
        props.onTaskUpdated(updatedTask);
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <tr>
      <td>{props.element.id}</td>
      <td>{props.element.task}</td>
      <td>
        <Complete done={props.element.done} onToggleDone={handleToggleDone} />
      </td>
      <td>
        <button onClick={handleRemoveTask}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskDetails;
