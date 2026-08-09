# JudgeX — Changelog

## 2026 — Deployment Milestone

### Major Milestones

- Built the backend foundation.
- Built the frontend coding experience.
- Integrated the problem-solving flow.
- Integrated Monaco-based code editing.
- Added/iterated on the Judge Worker.
- Refactored the execution path during debugging.
- Moved code execution from direct process assumptions toward Docker sandbox execution.
- Containerized the Judge Worker.
- Built and pushed the Judge Worker image to Amazon ECR.
- Deployed the worker to AWS EC2.
- Deployed the frontend to Vercel.
- Verified frontend-to-worker execution.
- Verified C++ compilation and runtime execution.
- Verified compilation-error handling.
- Verified runtime-error handling.
- Verified timeout handling.
- Verified network isolation.
- Verified host-path isolation.
- Verified temporary container filesystem behavior.

## Major Debugging Discovery

A lower Docker memory limit of **256 MB** was insufficient for the tested compiler/runtime environment.

The working configuration was increased to:

```text
512 MB memory
1 CPU
network disabled
```

After this adjustment, the intended C++ judge execution flow worked successfully.

## Documentation Milestone

Created the first consolidated technical documentation set covering:

- Project scope
- Architecture
- Judge Worker
- Deployment
- Security
- Testing
- API documentation strategy
- Development workflow
- Roadmap
- Changelog
