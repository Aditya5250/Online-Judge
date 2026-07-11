# 🚀 Online Judge Platform

A full-stack **Online Judge Platform** inspired by platforms like **LeetCode** and **HackerRank**.

The platform allows administrators to create coding problems and hidden test cases, while users can submit solutions in multiple programming languages (Currently C++, Java and Python). Every submission is securely executed inside Docker containers and automatically judged against hidden test cases.

The project is designed with a clean layered architecture following modern backend development practices, making it scalable, maintainable, and interview-friendly.

## Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization (Admin/User)

### 📝 Problem Management

- Create Problems
- Update Problems
- Delete Problems
- Slug-Based Problem URLs

### 🧪 Test Case Management

- Public Example Test Cases
- Hidden Test Cases
- CRUD Operations

### ⚡ Judge Engine

- Secure Docker-Based Execution
- Multi-Language Support
  - C++
  - Python
  - Java
- Output Comparison
- Accepted
- Wrong Answer
- Compilation Error
- Runtime Error
- Time Limit Exceeded

### 📊 Submission System

- Submit Code
- Automatic Judging
- Submission History
- Execution Time Tracking

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcrypt |
| Containerization | Docker |
| Languages Supported | C++, Python, Java |

## 🏗 Architecture

```text
Client
    │
    ▼
Express API
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Judge Engine
    │
    ▼
Docker
    │
    ▼
Compiler / Interpreter
    │
    ▼
Execution
    │
    ▼
MongoDB
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone (https://github.com/Aditya5250/Online-Judge)
cd online-judge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=7d
```

### 4. Pull Required Docker Images

```bash
docker pull gcc:latest
docker pull python:3.11
docker pull eclipse-temurin:17
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on:

```text
http://localhost:5000
```

## 📡 API Overview

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Problems

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/problems` | Create a problem |
| GET | `/api/problems` | Get all problems |
| GET | `/api/problems/:slug` | Get problem by slug |
| PUT | `/api/problems/:id` | Update problem |
| DELETE | `/api/problems/:id` | Delete problem |

### Test Cases

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/testcases` | Create test case |
| GET | `/api/testcases/:problemId` | Get test cases |
| PUT | `/api/testcases/:id` | Update test case |
| DELETE | `/api/testcases/:id` | Delete test case |

### Submissions

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/submissions` | Submit code |
| GET | `/api/submissions/me` | Get user submissions |

## 🚀 Future Improvements

- Contest Module
- Leaderboard
- Custom Test Cases ("Run Code")
- Memory Limit Enforcement
- Submission Analytics
- Rejudge Functionality
- Admin Dashboard
- Email Verification
- Password Reset
- Deployment using Docker Compose

## 👨‍💻 Author

**Aditya Raj**

If you found this project interesting, feel free to star the repository.
