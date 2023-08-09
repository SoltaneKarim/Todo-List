const express = require('express');
const db = require('./db');
const app = express();
const port = 1337;
const CORS = require ('cors')

app.use(express.json());
app.use(CORS())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
  db.queryAsync('SELECT * FROM tasks') // Use the correct table name "tasks"
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    });
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id; // Use the correct parameter name "id"

  try {
    const result = await db.queryAsync('DELETE FROM tasks WHERE id = ?', [taskId]); // Use the correct table name "tasks"

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the task.' });
  }
});

app.post('/tasks', async (req, res) => {
  const { task, done } = req.body;

  if (!task) { // Use the correct column name "task"
    return res.status(400).json({ error: 'task is required.' });
  }

  try {
    const result = await db.queryAsync('INSERT INTO tasks (task, done) VALUES (?, ?)', [task, done]); // Use the correct table name "tasks"
    const newTaskId = result[0].insertId;
    res.json({ message: 'Task created successfully.', taskId: newTaskId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the task.' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { task, done } = req.body;

  if (!task) { // Use the correct column name "task"
    return res.status(400).json({ error: 'task is required.' });
  }

  try {
    const result = await db.queryAsync('UPDATE tasks SET task = ?, done = ? WHERE id = ?', [task, done, taskId]); // Use the correct table name "tasks"

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ message: 'Task updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the task.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
