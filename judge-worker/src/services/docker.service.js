import { spawn } from "child_process";
import crypto from "crypto";

import {
    DOCKER_IMAGES,
    LANGUAGE_CONFIG,
    EXECUTION_LIMITS,
} from "../constants/execution.constants.js";

const WORKSPACE_ROOT =
    process.env.HOST_WORKSPACE ||
    process.env.WORKSPACE_ROOT ||
    "/workspace";

/**
 * Validate workspace path.
 */
const validateWorkspace = (workingDirectory) => {
    if (!workingDirectory) {
        throw new Error("Working directory is missing.");
    }

    if (!workingDirectory.startsWith(WORKSPACE_ROOT)) {
        throw new Error(
            `Invalid workspace path: ${workingDirectory}`
        );
    }

    return workingDirectory;
};

/**
 * Executes a Docker container using child_process.spawn.
 */
export const runDockerCommand = ({
    language,
    workingDirectory,
    command,
    input = "",
    timeoutMs,
    memoryLimit,
    cpuLimit,
}) => {
    return new Promise((resolve, reject) => {
        let stdout = "";
        let stderr = "";
        let timedOut = false;
        let hasSettled = false;

        const workspace = validateWorkspace(workingDirectory);
        const config = LANGUAGE_CONFIG[language] || EXECUTION_LIMITS;

        const effectiveTimeout = timeoutMs || config.timeout || EXECUTION_LIMITS.TIMEOUT;
        const effectiveMemory = memoryLimit || config.memoryLimit || EXECUTION_LIMITS.MEMORY_LIMIT;
        const effectiveCpu = cpuLimit || config.cpuLimit || EXECUTION_LIMITS.CPU_LIMIT;

        // Generate unique container name for lifecycle tracking
        const containerName = `judgex-${crypto.randomUUID()}`;

        const dockerArgs = [
            "run",
            "--rm",
            "-i",
            "--name",
            containerName,
            "--network=none",
            "--memory",
            effectiveMemory,
            "--cpus",
            effectiveCpu,
            "-v",
            `${workspace}:/workspace`,
            "-w",
            "/workspace",
            DOCKER_IMAGES[language],
            "sh",
            "-c",
            command,
        ];

        const startTime = Date.now();

        console.log(`[Docker] Spawning container ${containerName} (${language}): docker ${dockerArgs.join(" ")}`);

        const child = spawn("docker", dockerArgs, {
            stdio: ["pipe", "pipe", "pipe"],
        });

        // Timeout handler: explicitly kill the Docker daemon container so no orphans remain
        const timeout = setTimeout(() => {
            timedOut = true;

            // 1. Kill the container on the Docker daemon directly by name
            try {
                const killer = spawn("docker", ["kill", containerName]);
                killer.on("error", () => {}); // Ignore error if already stopped
            } catch (_) {}

            // 2. Terminate the local Docker CLI process
            try {
                child.kill("SIGKILL");
            } catch (_) {}
        }, effectiveTimeout);

        // Safely send input to stdin
        child.stdin.on("error", (err) => {
            // Ignore broken pipe if container exits before consuming all input
            if (err.code !== "EPIPE" && err.code !== "ERR_STREAM_DESTROYED") {
                console.error("[Docker stdin error]", err);
            }
        });

        if (input) {
            child.stdin.write(input);
        }
        child.stdin.end();

        // Stream output
        child.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        child.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        // Process error (e.g. Docker executable not found)
        child.on("error", (error) => {
            if (hasSettled) return;
            hasSettled = true;
            clearTimeout(timeout);

            reject(
                new Error(
                    `Failed to start Docker: ${error.message}`
                )
            );
        });

        // Process completion & verdict classification
        child.on("close", (exitCode, signal) => {
            if (hasSettled) return;
            hasSettled = true;
            clearTimeout(timeout);

            const executionTime = Date.now() - startTime;

            // 1. Time Limit Exceeded
            if (timedOut) {
                return resolve({
                    success: false,
                    stdout,
                    stderr: "Time limit exceeded.",
                    exitCode: 124,
                    isTimeLimitExceeded: true,
                    isMemoryLimitExceeded: false,
                    executionTime,
                });
            }

            // 2. Memory Limit Exceeded
            // When kernel OOM killer terminates container, exitCode is 137.
            // Or language runtime emits explicit out-of-memory errors.
            const isOomSignal = exitCode === 137;
            const isOomMessage =
                stderr.toLowerCase().includes("outofmemoryerror") ||
                stderr.toLowerCase().includes("memoryerror") ||
                stderr.toLowerCase().includes("out of memory");

            if (isOomSignal || isOomMessage) {
                return resolve({
                    success: false,
                    stdout,
                    stderr: stderr.trim() || "Memory limit exceeded.",
                    exitCode: exitCode ?? 137,
                    isTimeLimitExceeded: false,
                    isMemoryLimitExceeded: true,
                    executionTime,
                });
            }

            // 3. Runtime Error / Non-zero exit
            if (exitCode !== 0) {
                return resolve({
                    success: false,
                    stdout,
                    stderr: stderr.trim() || `Process exited with code ${exitCode}`,
                    exitCode,
                    isTimeLimitExceeded: false,
                    isMemoryLimitExceeded: false,
                    executionTime,
                });
            }

            // 4. Normal Successful Completion
            resolve({
                success: true,
                stdout,
                stderr,
                exitCode: 0,
                isTimeLimitExceeded: false,
                isMemoryLimitExceeded: false,
                executionTime,
            });
        });
    });
};

/**
 * Compile source code.
 */
export const compileInDocker = async ({
    language,
    workingDirectory,
    compileCommand,
}) => {
    if (!compileCommand) {
        return {
            success: true,
        };
    }

    const config = LANGUAGE_CONFIG[language] || EXECUTION_LIMITS;

    return await runDockerCommand({
        language,
        workingDirectory,
        command: compileCommand,
        timeoutMs: config.compileTimeout || 10000,
        memoryLimit: config.compileMemoryLimit || config.memoryLimit || "512m",
        cpuLimit: config.cpuLimit || "1",
    });
};

/**
 * Execute source code.
 */
export const runInDocker = async ({
    language,
    workingDirectory,
    runCommand,
    input = "",
}) => {
    const config = LANGUAGE_CONFIG[language] || EXECUTION_LIMITS;

    return await runDockerCommand({
        language,
        workingDirectory,
        command: runCommand,
        input,
        timeoutMs: config.timeout || 5000,
        memoryLimit: config.memoryLimit || "512m",
        cpuLimit: config.cpuLimit || "1",
    });
};