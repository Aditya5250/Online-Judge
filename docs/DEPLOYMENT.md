# JudgeX — Deployment Guide

## 1. Deployment Components

Current deployment consists of:

| Component | Deployment |
|---|---|
| Frontend | Vercel |
| Backend | Dockerized service on AWS EC2 (:5000) |
| Judge Worker | Dockerized service on AWS EC2 (:7000) |
| Container images | Amazon ECR |
| Execution | Docker Daemon on EC2 via `/var/run/docker.sock` |

## 2. Image Flow & Rollout Policy

> [!IMPORTANT]
> **No Automatic Rollout**: Pushing an image to Amazon ECR does **NOT** automatically update or restart the running container on AWS EC2. Deployments require an explicit manual rollout sequence on the EC2 host.

```text
Developer Machine
       │
       │ 1. docker build -t judgex-judge-worker ./judge-worker
       │ 2. docker tag judgex-judge-worker:latest <account-id>.dkr.ecr.<region>.amazonaws.com/judgex-judge-worker:latest
       ▼
Local Docker Image
       │
       │ 3. docker push <account-id>.dkr.ecr.<region>.amazonaws.com/judgex-judge-worker:latest
       ▼
Amazon ECR
       │
       │ 4. SSH to EC2 & authenticate with ECR
       │ 5. docker compose pull judge-worker
       ▼
AWS EC2 Host
       │
       │ 6. docker compose up -d --force-recreate judge-worker
       ▼
Running Judge Worker Container
```

## 3. Mandatory Runner Images (Pre-Pulling on EC2)

The Judge Worker spawns ephemeral sandbox containers on the EC2 Docker daemon.

> [!WARNING]
> If a runner image is **not** cached locally on the EC2 Docker daemon when a submission arrives, Docker attempts to download the image layers from Docker Hub on the fly. Because layer downloads take longer than the 5-second execution timeout, the job will fail with an artificial **Time Limit Exceeded** (TLE) and cancel the pull.

Before serving traffic, you **MUST** ensure all supported runner images are pre-pulled on the EC2 host:

```bash
docker pull gcc:latest
docker pull python:3.11
docker pull eclipse-temurin:17
```

Verify cached images with:

```bash
docker images | grep -E "gcc|python|eclipse-temurin"
```

## 4. ECR Authentication on EC2

On the EC2 host, authenticate Docker to your regional ECR registry:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

Ensure the registry URL uses the correct format: `<account-id>.dkr.ecr.<region>.amazonaws.com`.

## 5. Pulling & Recreating the Worker

### Step 1: Pull new worker image from ECR
```bash
docker compose pull judge-worker
```

### Step 2: Stop and recreate the running container
```bash
docker compose up -d --force-recreate judge-worker
```

### Step 3: Check container status
```bash
docker compose ps judge-worker
```

### Step 4: Health Check Verification
Verify the worker is responsive:
```bash
curl http://localhost:7000/api/health
```
Expected response:
```json
{"status":"healthy","service":"judge-worker"}
```

## 6. Logs & Diagnostics

To inspect live worker logs:
```bash
docker compose logs -f judge-worker
```

To view the last 100 log lines:
```bash
docker compose logs --tail=100 judge-worker
```

## 7. Image Identifier Verification

To prove that the EC2 container is running the exact image pushed to ECR:

```bash
docker inspect judgex-judge-worker --format '{{.Image}}'
docker image inspect <account-id>.dkr.ecr.<region>.amazonaws.com/judgex-judge-worker:latest --format '{{.Id}}'
```

Both SHA256 identifiers must match.

## 8. Frontend Deployment (Vercel)

The frontend is deployed through Vercel.

1. Ensure environment variables in Vercel point to the EC2 backend:
   ```text
   VITE_API_BASE_URL=https://api.judgex.live/api
   ```
2. Deploy via git push or Vercel CLI.

## 9. Verification Smoke Test Checklist

After each deployment, test all three languages through the live UI:

- [ ] C++: Accepted (e.g. standard Two Sum / Hello World)
- [ ] C++: Compilation Error (syntax error)
- [ ] C++: Runtime Error (division by zero)
- [ ] C++: Time Limit Exceeded (infinite loop)
- [ ] Python: Simple execution (`print("Hello")`) — must not timeout
- [ ] Python: Accepted solution
- [ ] Python: Time Limit Exceeded (`while True: pass`)
- [ ] Python: Memory Limit Exceeded (large memory allocation)
- [ ] Java: Simple execution (`Main` with `System.out.println`) — must not timeout
- [ ] Java: Accepted solution
- [ ] Java: Compilation Error (`javac` failure)
- [ ] Java: Time Limit Exceeded (infinite loop)
- [ ] Draft persistence: Edit C++, switch to Python, switch back — code preserved
- [ ] Solved state: Accepted submission marks problem as Solved on list and dashboard
- [ ] Run Code: Displays Expected vs Actual output and Verdict badge
- [ ] Security: Verify no orphan containers left with `docker ps`

