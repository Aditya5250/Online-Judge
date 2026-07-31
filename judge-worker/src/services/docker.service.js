import { spawn } from "child_process";

import {
    DOCKER_IMAGES,
    EXECUTION_LIMITS,
} from "../constants/execution.constants.js";

const WORKSPACE_ROOT =
    process.env.WORKSPACE_ROOT || "/workspace";

const HOST_WORKSPACE =
    process.env.HOST_WORKSPACE;

if (!HOST_WORKSPACE) {
    throw new Error(
        "HOST_WORKSPACE environment variable is missing."
    );
}

/**
 * Converts:
 *
 * /workspace/<uuid>
 *
 * to
 *
 * C:/JudgeX/judge-workspace/<uuid>
 */
const resolveHostWorkspace = (workingDirectory) => {

    if (!workingDirectory.startsWith(WORKSPACE_ROOT)) {
        throw new Error(
            `Invalid workspace path: ${workingDirectory}`
        );
    }

    const relativeDirectory = workingDirectory.slice(
        WORKSPACE_ROOT.length
    );

    return (
        HOST_WORKSPACE.replace(/\/$/, "") +
        relativeDirectory
    );
};

/**
 * Executes a Docker container.
 */
export const runDockerCommand = ({
    language,
    workingDirectory,
    command,
    input = "",
}) => {

    return new Promise((resolve, reject) => {

        let stdout = "";
        let stderr = "";

        const dockerVolume =
            `${resolveHostWorkspace(
                workingDirectory
            )}:/workspace`;

        const dockerArgs = [

            "run",

            "--rm",

            "-i",

            "--network=none",

            "--memory",
            EXECUTION_LIMITS.MEMORY_LIMIT,

            "--cpus",
            EXECUTION_LIMITS.CPU_LIMIT,

            "-v",
            dockerVolume,

            "-w",
            "/workspace",

            DOCKER_IMAGES[language],

            "sh",

            "-c",

            command,
        ];

        const startTime = Date.now();

        const child = spawn(
            "docker",
            dockerArgs
        );

        const timeout = setTimeout(() => {

            child.kill("SIGTERM");

            reject(
                new Error("Time limit exceeded.")
            );

        }, EXECUTION_LIMITS.TIMEOUT);

        child.stdin.write(input + "\n");

        child.stdin.end();

        child.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        child.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        child.on("error", (error) => {

            clearTimeout(timeout);

            reject(error);

        });

        child.on("close", (exitCode) => {

            clearTimeout(timeout);

            resolve({

                success: exitCode === 0,

                stdout,

                stderr,

                exitCode,

                executionTime:
                    Date.now() - startTime,

            });

        });

    });

};

/**
 * Compiles source code.
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

    return await runDockerCommand({

        language,

        workingDirectory,

        command: compileCommand,

    });

};

/**
 * Executes compiled/interpreted code.
 */
export const runInDocker = async ({
    language,
    workingDirectory,
    runCommand,
    input,
}) => {

    return await runDockerCommand({

        language,

        workingDirectory,

        command: runCommand,

        input,

    });

};