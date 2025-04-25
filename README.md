# TaskManager

**TaskManager** is a web application for managing tasks, built using **Node.js**, **Express**, and **MongoDB**. It allows users to create, update, delete, and manage tasks efficiently, with **JWT-based authentication** for secure access.

## Features

- **Task Creation**: Create new tasks with title, description, and status.
- **Task Update**: Update tasks as their status or details change.
- **Task Deletion**: Remove tasks that are no longer needed.
- **Authentication**: Secure login and registration using JWT tokens.
- **Email Integration**: Receive email notifications for important task updates (configurable via environment variables).

## API Documentation

View and test the API on Postman:  
[TaskManager API - Postman Collection](https://www.postman.com/altimetry-geoscientist-6151878/nur-mohammad-apu/collection/l220b51/task-manager?action=share&creator=34936735)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/) (optional for API testing)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nurmohammadapu/TaskManager.git
   cd TaskManager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set environment variables** in a `.env` file in the root directory:
   ```
   JWT_SECRET=your_jwt_secret_key
   MAIL_HOST=your_mail_host
   MAIL_PASS=your_mail_password
   MAIL_USER=your_mail_username
   MONGO_URI=mongodb_connection_string
   PORT=your_preferred_port_number
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   The server will run on the specified port (default: `5000`).

## Environment Variables

Make sure your `.env` file includes:

- `JWT_SECRET`: Secret for signing JWT tokens
- `MAIL_HOST`: SMTP mail server host
- `MAIL_PASS`: Mail account password
- `MAIL_USER`: Mail account username
- `MONGO_URI`: MongoDB connection URI
- `PORT`: Port number for the server

## Usage

### Authentication

- **Register**: `POST /api/auth/register` with `email`, `password`
- **Login**: `POST /api/auth/login` with `email`, `password`
- Use the returned JWT token in the `Authorization` header as `Bearer <token>` for protected routes.

### Task Endpoints

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

## Testing with Postman

Import the Postman collection to quickly test endpoints.

**Set Postman environment variable:**

- Key: `BASE_URL`
- Value: `https://taskmanager-yoir.onrender.com`

Then, use `{{BASE_URL}}` in your requests.

[Open Postman Collection](https://www.postman.com/altimetry-geoscientist-6151878/nur-mohammad-apu/collection/l220b51/task-manager?action=share&creator=34936735)

## Contributing

Contributions are welcome!  
Fork the repo, create a new branch, and submit a pull request.

