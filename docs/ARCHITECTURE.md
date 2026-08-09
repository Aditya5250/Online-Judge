# JudgeX — Architecture

## 1. Current Deployment Topology

```text
                         USER
                          │
                          │ HTTPS
                          ▼
                 ┌──────────────────┐
                 │ Vercel Frontend  │
                 │ React / Monaco   │
                 └────────┬─────────┘
                          │
                          │ API requests
                          ▼
                 ┌──────────────────┐
                 │     AWS EC2      │
                 │                  │
                 │  Backend Service │
                 │       │          │
                 │       ▼          │
                 │  Judge Worker    │
                 └───────┬──────────┘
                         │
                         │ docker run
                         ▼
                ┌────────────────────┐
                │ Ephemeral Sandbox   │
                │                    │
                │ gcc:latest         │
                │ network=none       │
                │ memory=512m        │
                │ cpus=1             │
                └────────────────────┘
```

## 2. Execution Lifecycle

```text
User writes code
      │
      ▼
Run / Submit
      │
      ▼
Backend / Judge Worker
      │
      ▼
Create job-specific workspace
      │
      ▼
Write main.cpp
      │
      ▼
Docker compilation
      │
      ├── failure ──► Compilation Error
      │
      ▼
Docker execution
      │
      ├── timeout ──► TLE
      ├── crash ────► Runtime Error
      ├── bad output ► Wrong Answer
      └── success ──► Accepted / Output
      │
      ▼
Return result to frontend
```

## 3. Worker Responsibilities

The Judge Worker is responsible for:

- Receiving execution work
- Creating/using a job-specific workspace
- Writing source code
- Invoking Docker
- Compiling source code
- Executing the compiled program
- Applying sandbox constraints
- Capturing output/errors
- Translating process results into a response
- Logging execution details for debugging

## 4. Why Docker Exists in the Architecture

Submitted code is untrusted. Running it directly inside the Node.js/EC2 host would allow the program to interact with the host environment far beyond what an online judge should permit.

Docker provides a practical isolation layer around each execution and allows resource/network constraints to be applied per execution.

## 5. Original Scalable Architecture

The original HLD describes a broader system:

```text
Client / React + Monaco
          │
          ▼
API / Gateway
     ┌────┴────┐
     ▼         ▼
 MongoDB     Redis
               │
               ▼
        Async Judge Workers
               │
               ▼
        Docker Sandboxes
               │
               ▼
          Verdict / Result
```

It also describes Redis as a queue/cache/leaderboard layer and MongoDB as persistent application storage.

The current deployment should not be documented as having every component of this target architecture unless those components are actually enabled in the production source/configuration.

## 6. Design Principle

The core architectural principle is:

> Keep the application server responsible for orchestration and keep untrusted program execution inside a separate, constrained sandbox.
