import { spawn } from "child_process";

import {
    DOCKER_IMAGES,
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

        const workspace =
            validateWorkspace(workingDirectory);

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
            `${workspace}:/workspace`,

            "-w",
            "/workspace",

            DOCKER_IMAGES[language],

            "sh",

            "-c",

            command,
        ];

        const startTime = Date.now();

        let timedOut = false;

        console.log("============================================================");
        console.log("Running Docker");
        console.log("docker", dockerArgs.join(" "));
        console.log("============================================================");


        const child = spawn(
            "docker",
            dockerArgs
        );

        const timeout = setTimeout(() => {

            timedOut = true;

            child.kill("SIGTERM");

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

            reject(
                new Error(
                    `Failed to start Docker: ${error.message}`
                )
            );

        });

        child.on("close", (exitCode) => {

            console.log("Docker exited:", exitCode);

            clearTimeout(timeout);

            if (timedOut) {

                return reject(
                    new Error("Time limit exceeded.")
                );

            }

            if (exitCode !== 0) {

                return reject(

                    new Error(

                        stderr ||

                        `Docker exited with code ${exitCode}`

                    )

                );

            }

            resolve({

                success: true,

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

    return await runDockerCommand({

        language,

        workingDirectory,

        command: compileCommand,

    });

};

/**
 * Execute source code.
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