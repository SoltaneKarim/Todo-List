// TaskList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskDetails from './TaskDetails.jsx';
import Inputs from './Inputs.jsx';

const TaskList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/tasks')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const handleTaskCreated = (newTask) => {
    setData([...data, newTask]);
  };

  const handleTaskRemoved = (taskId) => {
    const updatedData = data.filter((task) => task.id !== taskId);
    setData(updatedData);
  };

  return (
    <div>
      <Inputs onTaskCreated={handleTaskCreated} />
      <table className="task-table">
        <thead>
          <tr>
            <th>ID's</th>
            <th>Tasks</th>
            <th>Done</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <TaskDetails
              key={element.id}
              element={element}
              onTaskRemoved={handleTaskRemoved}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
