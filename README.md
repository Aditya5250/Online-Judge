# JudgeX

> A full-stack online judge platform for solving programming problems, running code safely, submitting solutions, tracking results, and using AI-assisted learning tools.

## Project Status

**Current milestone: End-to-end judge execution is operational.**

JudgeX has progressed from a local MERN-style online judge implementation to a deployed architecture with:

- Frontend deployed on **Vercel**
- Backend and Judge Worker containerized and deployed on **AWS EC2**
- Docker images stored in **Amazon ECR**
- C++ execution performed inside ephemeral Docker containers
- Network disabled for submitted programs
- CPU and memory limits applied to execution containers
- Compilation/runtime errors surfaced to the frontend
- Timeout handling verified
- Filesystem isolation checks verified
- AI Mentor integrated into the coding experience

The original project design defines the platform around authentication, problems, a Monaco-based coding arena, judging, profiles/submission history, leaderboard functionality, and AI assistance. See `docs/PROJECT_SCOPE.md` and `docs/ARCHITECTURE.md`.

## Features

### User-facing

- Authentication
- Problem browsing
- Problem details
- Difficulty/tags
- Monaco code editor
- C++ execution
- Code submission and verdicts
- Custom input execution
- AI Mentor
- Profile/submission-related functionality
- Leaderboard functionality

### Judge Engine

The execution system supports the major judge outcomes required by the current implementation:

- Accepted / successful execution
- Wrong Answer
- Compilation Error
- Runtime Error
- Time Limit Exceeded

The sandbox also prevents normal network access from submitted programs.

## Architecture

Current deployment:

```text
                         ┌─────────────────────┐
                         │      User Browser   │
                         │  JudgeX Web Client   │
                         └──────────┬──────────┘
                                    │ HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │       Vercel        │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │ API
                                    ▼
                         ┌─────────────────────┐
                         │     AWS EC2         │
                         │ Backend + Worker    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Docker Execution    │
                         │     Sandbox         │
                         └─────────────────────┘
```

The execution sandbox is deliberately separated from the worker process. The worker is responsible for orchestration; submitted code runs in a fresh Docker container.

## Sandbox

The verified execution command applies controls equivalent to:

```bash
docker run --rm -i \
  --network=none \
  --memory 512m \
  --cpus 1 \
  -v <job-workspace>:/workspace \
  -w /workspace \
  gcc:latest \
  sh -c "<compile or execute command>"
```

### Why these controls matter

| Control | Purpose |
|---|---|
| `--network=none` | Prevent submitted programs from making normal network connections |
| `--memory 512m` | Bound memory available to the execution container |
| `--cpus 1` | Bound CPU allocation |
| `--rm` | Remove the execution container after completion |
| Per-job workspace | Keep submitted files separated by job |
| `/workspace` working directory | Give the program a predictable execution location |

> The exact runtime policy should be reviewed before opening the platform to hostile/public workloads. See `docs/SECURITY.md`.

## Deployment

Images are pushed to Amazon ECR and pulled by the EC2 deployment.

Typical flow:

```text
Local development
      │
      ▼
Docker build
      │
      ▼
Amazon ECR
      │
      ▼
EC2: docker compose pull
      │
      ▼
docker compose up -d --force-recreate
      │
      ▼
Running JudgeX services
```

Deployment details are documented in `docs/DEPLOYMENT.md`.

## Documentation

| Document | Purpose |
|---|---|
| `docs/PROJECT_SCOPE.md` | Product vision and current scope |
| `docs/ARCHITECTURE.md` | System architecture and request/execution flow |
| `docs/JUDGE_WORKER.md` | Judge Worker implementation and sandbox behavior |
| `docs/DEPLOYMENT.md` | ECR, EC2, Docker Compose and Vercel deployment |
| `docs/SECURITY.md` | Sandbox model, threat model and hardening checklist |
| `docs/TESTING.md` | Verified functional and security tests |
| `docs/API.md` | API documentation conventions and endpoint inventory placeholder |
| `docs/DEVELOPMENT.md` | Local development and contribution workflow |
| `docs/ROADMAP.md` | Production-hardening and future roadmap |
| `docs/CHANGELOG.md` | Major project milestones |

## Important Engineering Lesson

One of the most important debugging milestones in JudgeX was discovering that a seemingly correct Docker execution path could still fail under an overly restrictive memory limit.

The execution environment was initially tested with a lower memory limit. The final working configuration increased the container memory allowance to **512 MB**, after which the deployed worker successfully handled the intended C++ compilation/execution flow.

This is an important lesson for the project: sandbox limits must be restrictive enough for security, but realistic enough for the compiler/runtime toolchain being used.

## Security Notice

JudgeX executes untrusted user code. Docker isolation is a security boundary, not a guarantee that the system is production-safe against every possible container escape or host attack.

Before public deployment, review:

- PID limits
- Output-size limits
- Disk/workspace quotas
- Container capabilities
- `no-new-privileges`
- seccomp/AppArmor policy
- Host filesystem exposure
- Workspace cleanup
- Concurrency limits
- Docker daemon exposure
- EC2 IAM permissions
- Secrets management
- Rate limiting
- Logging and alerting

See `docs/SECURITY.md`.

## Original Design Direction

The project's earlier HLD describes a broader architecture involving a React/Monaco client, Node.js backend, MongoDB persistence, Redis queue/cache/leaderboard components, asynchronous judge workers, Docker sandboxes, and AI assistance.

Those architectural goals are preserved as the project's long-term direction, but this README intentionally distinguishes the **currently verified deployment** from the **future scalable architecture**.

## License

Add the project's final license here before public release.
