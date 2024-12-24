// Ensure that you are importing pool correctly from your dbConfig
const { pool } = require("../dbConfig/conn");

const add = async (req, res) => {
  const { todo_name } = req.body; // Destructure the input data

  if (!todo_name || todo_name.trim() === '') {
    return res.status(400).json({ error: 'Todo name is required' });
  }

  try {
    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      `INSERT INTO todo (todo_name) VALUES ($1) RETURNING *`,
      [todo_name]
    );

    // Return the newly inserted row
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: 'Error inserting task' });
  }
};

const tasks = async (req, res) => {
  try {
    // Use parameterized query to prevent SQL injection
    const result = await pool.query('SELECT * FROM todo');

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

const tododelete = async (req, res) => {
  const { todoId } = req.params; // Extract todoId from the URL parameter
  try {
    // Query to delete the task with the given todoId
    const result = await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [todoId]);

    // Check if the task was found and deleted
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Respond with a success message
    res.status(200).json({
      message: 'Task deleted successfully',
      deletedTask: result.rows[0],
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};
const todoUpdate = async (req, res) => {
  const { id } = req.params; // Extract todo_id from URL parameter
  const { todo_name } = req.body; // Extract updated todo_name from the request body

  // Validate input
  if (!todo_name || todo_name.trim() === '') {
    return res.status(400).json({ error: 'Updated todo name is required' });
  }

  try {
    // Query to update the task's name by ID
    const result = await pool.query(
      'UPDATE todo SET todo_name = $1 WHERE todo_id = $2 RETURNING *',
      [todo_name, id]
    );

    // Check if the task was found and updated
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Respond with the updated task
    res.status(200).json({
      message: 'Task updated successfully',
      updatedTask: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};


module.exports = { add, tasks,tododelete,todoUpdate };
