const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser'); 

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
connectDB();

// CORS configuration with specific origin and credentials allowed
const corsOptions = {
   origin: ['http://localhost:3000', 'https://task-manager-chakra-ui.vercel.app'],
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});

module.exports = app;
