# JudgeX — API Documentation

## Status

This document is intentionally conservative.

The project's original design defines API responsibilities around authentication, problem retrieval, problem details, code execution/submission, profiles, leaderboard functionality, and AI assistance.

The exact production endpoint paths, HTTP methods, request schemas, and response schemas should be generated from the current backend source before publishing a final API contract.

## Core API Responsibilities

### Authentication

Expected responsibilities:

- Register
- Login
- Logout
- Authentication/session validation

### Problems

Expected responsibilities:

- List problems
- Fetch problem details
- Search/filter
- Difficulty/tags

### Execution

Expected responsibilities:

- Run code
- Submit code
- Receive execution result
- Return stdout/stderr/verdict/metadata as applicable

### Profile / Submissions

Expected responsibilities:

- User profile
- Submission history
- Statistics

### Leaderboard

Expected responsibilities:

- Retrieve rankings
- Retrieve relevant submission/statistics data

### AI Mentor

Expected responsibilities:

- Hint generation
- Code review
- Complexity discussion
- Doubt solving

## Documentation Rule

When finalizing this file from the production repository, document every public endpoint using:

```text
METHOD /path

Purpose:
Authentication:
Request:
Response:
Errors:
Example:
```

Do not document guessed routes. The backend source of truth should determine the final API contract.
