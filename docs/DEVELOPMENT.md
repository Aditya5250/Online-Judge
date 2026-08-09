# JudgeX — Development Guide

## 1. Repository Structure

The project is conceptually divided into:

```text
frontend/
backend/
judge-worker/
docs/
```

Use the actual repository directory names as the source of truth if they differ.

## 2. Development Order

A productive development sequence is:

1. Start database/services required by the backend.
2. Start the backend.
3. Start the frontend.
4. Start the Judge Worker.
5. Test normal execution.
6. Test failure cases.
7. Test sandbox security cases.
8. Test the complete frontend flow.

## 3. Judge Worker Development

The worker is security-sensitive.

Do not test untrusted execution directly on the host.

Use the Docker sandbox even during local development.

## 4. Debugging

Useful EC2 commands:

```bash
docker compose ps judge-worker
docker compose logs --tail=50 judge-worker
docker compose logs -f judge-worker
docker inspect <container>
docker image inspect <image>
```

When a job fails, inspect the worker logs first.

The worker logs should expose enough information to distinguish:

- source writing failure
- compilation failure
- execution failure
- timeout
- Docker command failure
- unexpected process exit

Do not log secrets or user credentials.

## 5. Git Workflow

Recommended:

```text
feature/*
bugfix/*
refactor/*
docs/*
```

Before merging:

- Run tests
- Verify sandbox behavior
- Verify environment variables
- Review Docker changes
- Review resource limits
- Review security implications

## 6. Environment Variables

Never commit production secrets.

Document variable names and purpose, not secret values.

Example:

```text
BACKEND_URL=
MONGODB_URI=
REDIS_URL=
JWT_SECRET=
AI_API_KEY=
```

Only include variables that actually exist in the current source tree in the final repository documentation.
