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
  getTasksByCategory,
  searchTasks 
} = require('../controllers/taskController');

const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for Task Management

// Create task (Requires authentication)
router.post('/', auth, createTask);

// Get all tasks for user (Requires authentication)
router.get('/:userId', auth, getTasks);

// Get pending tasks (Requires authentication)
router.get('/pending/:userId', auth, getPendingTasks);

// Get completed tasks (Requires authentication)
router.get('/completed/:userId', auth, getCompletedTasks);

// Update task by ID (Requires authentication)
router.put('/:id', auth, updateTask);

// Delete task by ID (Requires authentication)
router.delete('/:id', auth, deleteTask);

// Get task by ID (Requires authentication)
router.get('/task/:id', auth, getTaskById);

// Toggle task status (Requires authentication)
router.put('/status/:id', auth, toggleTaskStatus);

// Route for getting tasks by category (Requires authentication)
router.get('/:userId/category/:category', auth, getTasksByCategory);

// Search tasks by title (Requires authentication)
router.get('/search', auth, searchTasks);

module.exports = router;
