const Task = require('../models/Task');

// Get all tasks for a specific user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to retrieve tasks' 
    });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to retrieve task' 
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, category, status, user } = req.body;

    if (!title || !category || !status || !user) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    const newTask = await Task.create({
      title,
      description,
      category,
      status,
      user,
    });

    return res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to create task'
     });
  }
};

// Update task by ID
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    return res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to update task' 
    });
  }
};

// Delete task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to delete task' 
    });
  }
};

// Mark task as completed or pending
exports.toggleTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    if (!['Completed', 'Pending'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status' 
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    return res.status(200).json({
      message: 'Task status updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to update task status' 
    });
  }
};

// Get all tasks for a specific user by category (Work, Personal, Other)
exports.getTasksByCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const category = req.params.category;  // Get category from route parameters

    // Find tasks for the user based on the category
    const tasks = await Task.find({
      user: userId,
      category: category,  // Filter by category
    }).sort({ createdAt: -1 });

    // Return the tasks if found, else return a 404 error
    if (tasks.length === 0) {
      return res.status(404).json({
        message: `No tasks found for the category: ${category}`,
      });
    }

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to retrieve tasks by category',
    });
  }
};




// Get all pending tasks for a specific user
exports.getPendingTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({
      user: userId,
      status: 'Pending',
    }).sort({ createdAt: -1 });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to retrieve pending tasks' 
    });
  }
};

// Get all completed tasks for a specific user
exports.getCompletedTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({
      user: userId,
      status: 'Completed',
    }).sort({ createdAt: -1 });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Failed to retrieve completed tasks' 
    });
  }
};
