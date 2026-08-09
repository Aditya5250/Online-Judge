# JudgeX — Security Model

## 1. Threat Model

The Judge Worker executes source code supplied by users.

Potential malicious behavior includes:

- Infinite loops
- Excessive memory allocation
- Excessive CPU usage
- Network requests
- Attempts to inspect the host
- Attempts to write outside the intended workspace
- Large output generation
- Process spawning
- Attempts to abuse the container/runtime

## 2. Current Defenses

### Network isolation

```text
--network=none
```

Tested successfully.

### Memory limit

```text
--memory 512m
```

Tested in the deployed worker configuration.

### CPU limit

```text
--cpus 1
```

Applied to execution containers.

### Ephemeral execution container

```text
--rm
```

The execution container is removed after completion.

### Workspace isolation

Only the job workspace is mounted into `/workspace`.

The EC2 host path `/home/ec2-user` was not visible from inside the execution container.

## 3. Defense in Depth

Docker should not be treated as the only security mechanism for a public hostile workload.

Recommended controls:

### Process limits

Use a PID limit to reduce fork/process exhaustion attacks.

### Linux capabilities

Drop unnecessary capabilities:

```text
--cap-drop=ALL
```

Only add capabilities if a language/runtime genuinely requires them.

### Privilege escalation

Consider:

```text
--security-opt=no-new-privileges
```

### Seccomp/AppArmor

Review the default Docker profile and consider a stricter profile for the execution workload.

### Output limits

A program should not be able to produce unlimited stdout/stderr.

### Disk limits

A program should not be able to fill the host filesystem through a mounted workspace or temporary files.

### Workspace cleanup

Explicitly remove host-side job directories after execution.

### Concurrency

Limit the number of simultaneous executions so that many submissions cannot exhaust EC2 resources.

### Secrets

The execution container should never receive application secrets, AWS credentials, database credentials, JWT signing secrets, or AI provider keys.

## 4. Network Policy

Submitted programs currently receive no normal container network.

This is important because code such as:

```cpp
// attempt outbound connection
```

must not be able to reach arbitrary external hosts.

The observed result was:

```text
Network is unreachable
```

## 5. Host Filesystem Policy

The worker should mount only the files required for the current job.

Do not mount:

```text
/home/ec2-user
/etc
/var/run/docker.sock
AWS credential directories
application secrets
```

unless there is an explicitly reviewed reason.

In particular, never mount the Docker socket into an untrusted execution container.

## 6. Security Regression Tests

Every sandbox change should rerun:

1. Normal program
2. Infinite loop
3. Large memory allocation
4. Network access
5. Host path access
6. Large output
7. Large file creation
8. Many-process/fork behavior
9. Non-zero exit
10. Compiler failure

## 7. Security Status

The current implementation has demonstrated meaningful isolation controls, but a public production judge should complete the defense-in-depth checklist before being considered hardened against hostile workloads.
