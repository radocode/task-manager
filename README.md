# Task Management Application

A full-stack task management application built with NestJS, React, TypeScript, and PostgreSQL. The application allows users to create, read, update, and delete tasks with a clean and intuitive interface.

## Features

- Create, read, update, and delete tasks
- Mark tasks as pending or completed
- Responsive design
- Real-time updates
- RESTful API

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- Vite
- Custom CSS

### Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Class Validator
- Class Transformer

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker and Docker Compose (optional, for containerized deployment)

## Running the Application

### Option 1: Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. Create a `.env` file in the `backend` directory with the following variables:

   ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=tasks_db
    PORT=3000
   ```

3. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: <http://localhost:80>
   - Backend API: <http://localhost:3000>

### Option 2: Running Locally

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `taskdb`

4. Copy the `.env.example` file to `.env` and update the variables:

   ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=tasks_db
    PORT=3000
   ```

5. Start the backend server:

   ```bash
   npm run start:dev
   ```

#### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the application at <http://localhost:5173>

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Development

### Frontend Development

The frontend is built with Vite and uses TypeScript. Key files:

- `src/components/` - React components
- `src/store/` - Redux store and slices
- `src/services/` - API service layer
- `src/index.css` - Global styles

### Backend Development

The backend uses NestJS with TypeScript. Key files:

- `src/controllers/` - Request handlers
- `src/entities/` - TypeORM entities
- `src/dto/` - Data Transfer Objects
- `src/migrations/` - Database migrations
- `src/config/` - Configuration files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
