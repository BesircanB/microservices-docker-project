# Microservices Docker Project

This project demonstrates a simple microservices architecture using Node.js, Express, and TypeScript, orchestrated with Docker Compose. It consists of an API Gateway, an Authentication Service, and a User Service.

## 🚀 Services

- **API Gateway** (`port 3000`): The single entry point for all client requests. It creates a unified API by forwarding requests to the appropriate backend services.
- **Auth Service** (`port 3001`): Handles user registration and login.
- **User Service** (`port 3002`): Manages user information.

> [!NOTE]
> Currently, the services use **in-memory** data storage. Any data created (registered users, etc.) will be lost when the containers are restarted.

## 🛠️ Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Containerization**: Docker & Docker Compose
- **HTTP Client**: Axios (used in Gateway)

## 🏁 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop/Engine).

### Installation & Running

1. **Clone the repository** (if you haven't already).
2. **Navigate to the project root**:
   ```bash
   cd microservices-docker-project
   ```
3. **Build and start the services**:
   ```bash
   docker-compose up --build
   ```
   
   This command will:
   - Build the Docker images for `api-gateway`, `auth-service`, and `user-service`.
   - Start the containers and link them together.

4. **Access the API**:
   The API Gateway is accessible at `http://localhost:3000`.

## 📚 API Documentation

All requests should be sent to the **API Gateway** (`http://localhost:3000`).

### Authentication

#### Register a new user
- **Endpoint**: `POST /register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": 1
  }
  ```

#### Login
- **Endpoint**: `POST /login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "user-1-token"
  }
  ```

### Users

#### Get all users
- **Endpoint**: `GET /users`
- **Response**:
  ```json
  [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Charlie" }
  ]
  ```

#### Get user by ID
- **Endpoint**: `GET /users/:id`
- **Example**: `GET /users/1`
- **Response**:
  ```json
  { "id": 1, "name": "Alice" }
  ```

## 🏗️ Project Structure

```
microservices-docker-project/
├── api-gateway/       # Forwards requests to Auth/User services
├── auth-service/      # Handles registration/login logic
├── user-service/      # Handles user data retrieval
└── docker-compose.yml # Service orchestration configuration
```
