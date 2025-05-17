# Freelance Service Provider Web App

A web application that allows users to post their skills and services, and connect with potential clients.

## Features

- User authentication (login/signup)
- Post skills with details and images
- View all available skills
- View detailed skill information
- Manage your own skill posts
- Delete your own posts

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/freelance-app
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user
- POST /api/skills - Create a new skill post
- GET /api/skills - Get all skills
- GET /api/skills/:id - Get skill details
- GET /api/profile - Get user's skills
- DELETE /api/profile/:id - Delete a skill post

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication
  - Multer (for file uploads) 