const express = require('express');
const {
  getTasks,
  createTask,
  getPendingTasks,
  getCompletedTasks,
  updateTask,
  deleteTask,
  getTaskById,
  toggleTaskStatus,
  getTasksByCategory
} = require('../controllers/taskController');

const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for Task Management

// Create task
router.post('/', createTask); 
// Get all tasks for user
router.get('/:userId', getTasks); 
// Get pending tasks
router.get('/pending/:userId', getPendingTasks); 
// Get completed tasks
router.get('/completed/:userId', getCompletedTasks); 
// Update task by ID
router.put('/:id', updateTask); 
// Delete task by ID
router.delete('/:id', deleteTask); 
// Get task by ID
router.get('/task/:id', getTaskById); 
// Toggle task status
router.put('/status/:id', toggleTaskStatus); 
// Route for getting tasks by category
router.get('/:userId/category/:category', getTasksByCategory);


module.exports = router;
