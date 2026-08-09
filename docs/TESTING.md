# JudgeX — Testing & Validation

## 1. Purpose

This document records the tests that were actually demonstrated during the JudgeX deployment/debugging cycle.

## 2. Functional Tests

| Test | Expected | Result |
|---|---|---|
| Simple C++ program | Output returned | PASS |
| `HELLO_FROM_JUDGEX` | Exact output | PASS |
| Compilation error | Compiler message shown | PASS |
| Division by zero | Runtime failure | PASS |
| Infinite loop | Time limit exceeded | PASS |
| Network access | Network blocked | PASS |
| Workspace file creation | File available during job | PASS |
| Temporary file | Available during job | PASS |
| Fresh execution | Temporary file absent | PASS |

## 3. Error Tests

### Compilation Error

A missing semicolon produced a compiler diagnostic in the frontend.

### Runtime Error

Division by zero produced:

```text
Floating point exception (core dumped)
Exit Code: 136
```

### Time Limit

An infinite loop produced:

```text
Time limit exceeded.
Exit Code: 124
```

## 4. Network Test

A program attempting network access returned:

```text
NETWORK BLOCKED: Network is unreachable
```

with exit code 0 for the test wrapper.

This confirms that the container's network namespace is disabled.

## 5. Filesystem Test

A program inspected:

```text
/
```

and was able to see the container filesystem.

It then attempted:

```text
ls -la /home/ec2-user
```

and received:

```text
No such file or directory
```

This verifies that the EC2 user's home directory was not directly mounted into the execution container.

## 6. Temporary File Test

A program created files inside its workspace and `/tmp`.

The job workspace contained expected job files during execution.

A fresh execution did not retain the prior container's temporary `/tmp` contents.

## 7. Deployment Test

The following deployment flow was validated:

```text
Local image
   ↓
ECR push
   ↓
EC2 ECR login
   ↓
docker compose pull
   ↓
docker compose up -d --force-recreate
   ↓
Worker running
```

The pulled image identifier and running container image identifier matched.

## 8. Regression Checklist

Before each production deployment:

- [ ] Simple C++
- [ ] Compilation error
- [ ] Runtime error
- [ ] Infinite loop
- [ ] Network access
- [ ] Filesystem access
- [ ] Workspace creation
- [ ] Temporary file cleanup
- [ ] Output limit
- [ ] Memory limit
- [ ] CPU limit
- [ ] Worker restart
- [ ] ECR pull
- [ ] Frontend smoke test

## 9. Testing Philosophy

The judge should be tested as a security-sensitive execution system, not merely as an API.

A successful API response does not prove that the sandbox is safe. The execution environment itself must be tested against hostile programs.
