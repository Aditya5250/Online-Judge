# JudgeX — Deployment Guide

## 1. Deployment Components

Current deployment consists of:

| Component | Deployment |
|---|---|
| Frontend | Vercel |
| Backend | Dockerized service on AWS EC2 |
| Judge Worker | Dockerized service on AWS EC2 |
| Container images | Amazon ECR |
| Execution | Docker on EC2 |

## 2. Image Flow

```text
Developer machine
       │
       │ docker build
       ▼
Local Docker image
       │
       │ docker tag
       ▼
ECR repository
       │
       │ docker push
       ▼
Amazon ECR
       │
       │ EC2 docker login
       │ docker compose pull
       ▼
AWS EC2
       │
       │ docker compose up -d
       ▼
Running service
```

## 3. ECR Authentication

On EC2, authenticate Docker to the regional ECR registry.

The registry must use the correct AWS ECR hostname form:

```text
<account-id>.dkr.ecr.<region>.amazonaws.com
```

The project encountered an important deployment typo during development: using an incorrect hostname form caused the initial push flow to fail. The corrected `amazonaws.com` hostname worked.

## 4. Pulling the Worker

The verified EC2 operation was:

```bash
docker compose pull judge-worker
```

The expected result was that the ECR image was successfully pulled.

## 5. Recreating the Worker

After pulling:

```bash
docker compose up -d --force-recreate judge-worker
```

Then:

```bash
docker compose ps judge-worker
```

The worker should show as running.

## 6. Logs

To inspect the worker:

```bash
docker compose logs --tail=50 judge-worker
```

For live logs:

```bash
docker compose logs -f judge-worker
```

A healthy worker should show its startup message and execution logs.

## 7. Image Verification

The deployed image was verified using both:

```bash
docker inspect <container> --format '{{.Image}}'
```

and:

```bash
docker image inspect <image> --format '{{.Id}}'
```

The resulting image identifiers matched during the deployment validation.

This is useful for proving that EC2 is running the intended ECR image.

## 8. Frontend Deployment

The frontend is deployed through Vercel.

After deployment, the frontend must point to the correct deployed backend URL/configuration.

A complete smoke test should verify:

1. Open the live frontend.
2. Open a problem.
3. Enter C++ code.
4. Run the code.
5. Confirm the result.
6. Trigger a compilation error.
7. Trigger a runtime error.
8. Trigger a timeout.
9. Test network isolation.

## 9. Production Deployment Checklist

Before public release:

- [ ] Production environment variables configured
- [ ] Secrets not committed to Git
- [ ] ECR repositories private
- [ ] EC2 security group reviewed
- [ ] Docker daemon not publicly exposed
- [ ] Worker logs available
- [ ] Workspace cleanup verified
- [ ] Resource limits verified
- [ ] Timeout verified
- [ ] Network isolation verified
- [ ] Output limits verified
- [ ] Backup/recovery plan documented
- [ ] Monitoring/alerting configured
- [ ] Rollback procedure documented
