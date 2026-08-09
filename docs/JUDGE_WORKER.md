# JudgeX — Judge Worker

## 1. Purpose

The Judge Worker is the execution component of JudgeX.

Its job is to turn submitted source code into a controlled execution result without running that code directly in the application process.

## 2. Workspace

Each execution receives a job-specific workspace.

The worker writes the submitted C++ source into:

```text
/workspace/main.cpp
```

The workspace is mounted into the execution container.

This allows the compiler and executable to access the job's files without exposing the EC2 user's general home directory.

## 3. Compilation

The verified compilation flow is equivalent to:

```bash
docker run --rm -i \
  --network=none \
  --memory 512m \
  --cpus 1 \
  -v <job-workspace>:/workspace \
  -w /workspace \
  gcc:latest \
  sh -c 'g++ main.cpp -o main'
```

Compilation stderr is captured and returned when compilation fails.

## 4. Execution

After compilation succeeds, the executable is run in a fresh constrained container:

```bash
docker run --rm -i \
  --network=none \
  --memory 512m \
  --cpus 1 \
  -v <job-workspace>:/workspace \
  -w /workspace \
  gcc:latest \
  sh -c './main'
```

## 5. Resource Policy

Current verified policy:

| Resource | Current setting |
|---|---|
| Memory | 512 MB |
| CPU | 1 CPU |
| Network | Disabled |
| Container cleanup | `--rm` |
| Working directory | `/workspace` |

## 6. Result Handling

The worker can expose:

- Standard output
- Standard error
- Exit code
- Timeout result
- Compilation result
- Runtime result

Examples observed during testing:

### Successful execution

```text
HELLO_FROM_JUDGEX
```

### Compilation failure

```text
error: expected ';' before 'return'
```

### Runtime failure

```text
Floating point exception (core dumped)
Exit Code: 136
```

### Timeout

```text
Time limit exceeded.
Exit Code: 124
```

### Network isolation

```text
NETWORK BLOCKED: Network is unreachable
```

## 7. Important Memory-Limit Debugging Lesson

The worker initially used a lower memory limit of 256 MB.

Although this looked reasonable for user programs, the actual compiler/runtime environment could exceed that limit during execution. This caused jobs to be killed unexpectedly.

The working configuration was increased to 512 MB.

This demonstrates that judge resource limits must account for:

- Compiler memory
- Runtime memory
- Language runtime overhead
- Container overhead
- Application-level execution behavior

## 8. Filesystem Tests

The worker was tested for host-path visibility.

A submitted program attempting to inspect:

```text
/home/ec2-user
```

received:

```text
No such file or directory
```

A separate test successfully created a file inside `/tmp`, but the file did not survive a fresh execution container.

This demonstrates the intended ephemeral execution behavior.

## 9. Network Test

A submitted program attempted to access the network.

The container was launched with:

```bash
--network=none
```

and the frontend displayed:

```text
NETWORK BLOCKED: Network is unreachable
```

This confirms the execution container does not have normal outbound network connectivity.

## 10. Future Hardening

Recommended next steps:

- `--pids-limit`
- `--cap-drop=ALL`
- `--security-opt=no-new-privileges`
- Review seccomp/AppArmor
- Output-size limit
- Disk/workspace quota
- Explicit workspace cleanup
- Strong timeout enforcement
- Concurrency control
- Better signal-to-verdict mapping
