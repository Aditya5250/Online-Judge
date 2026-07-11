import { spawn } from "child_process";
import {
    DOCKER_IMAGES,
    EXECUTION_LIMITS,
} from "./constants.js";
import { SUBMISSION_VERDICT } from "../constants/submissionVerdict.js";

export const runDockerCommand = ({
    language,
    workingDirectory,
    command,
    input = "",
}) => { // it will execute code inside docker... it will 1. launch docker container, 2. compile code, 3. execute programe, 4. capture stdout & stderr, 5. Return execution result

    return new Promise((resolve, reject) => { //new Promise because spawn is event-driven.. it doe not return output immediately

        let stdout = "";
        let stderr = "";

        // Windows -> Docker path compatibility
        const dockerVolume =
            `${workingDirectory.replace(/\\/g, "/")}:/workspace`;

        const dockerArgs = [
            "run",
            "--rm",


            "-i",

            // Disable internet
            "--network=none",

            "--memory",
            EXECUTION_LIMITS.MEMORY_LIMIT,

            "--cpus",
            EXECUTION_LIMITS.CPU_LIMIT,

            // Mount temp directory
            "-v",
            dockerVolume,

            "-w",
            "/workspace",

            // Docker image
            DOCKER_IMAGES[language],

            // Execute shell command
            "sh",
            "-c",
            command,
        ];

        const startTime = Date.now();

        const child = spawn(
            "docker",
            dockerArgs
        );

        // Timeout protection
        const timeout = setTimeout(() => {

            child.kill("SIGKILL");

            reject(
                new Error("Time limit exceeded")
            );

        }, EXECUTION_LIMITS.TIMEOUT);

        // Sends input
        child.stdin.write(input);
        child.stdin.end();

        // Captures stdout
        child.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        // Captures stderr
        child.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        // process the error
        child.on("error", (error) => {

            clearTimeout(timeout);

            reject(error);

        });

        // Process completed
        child.on("close", (exitCode) => {

            clearTimeout(timeout);
    

            resolve({
                success: exitCode === 0,
                stdout,
                stderr,
                exitCode,
                executionTime: Date.now() - startTime,
            });

        });

    });

};

export const compileInDocker=async({
    language,
    workingDirectory,
    compileCommand,
})=>{
    if(!compileCommand){
        return {
            success:true,
        };
    }
    const result =await runDockerCommand({
        language,
        workingDirectory,
        command:compileCommand,
    });
    console.log("Compile Exit Code", result.exitCode);
    console.log("Compile stderr: ", result.stderr);
    
    if(!result.success){
        result.type=SUBMISSION_VERDICT.COMPILATION_ERROR;
    }
    return result;
}

export const runInDocker =async({
    language,
    workingDirectory,
    runCommand,
    input,
})=>{
    const result =await runDockerCommand({
        language,
        workingDirectory,
        command:runCommand,
        input,
    });
    if(!result.success){
        result.type=SUBMISSION_VERDICT.RUNTIME_ERROR;
    }
    return result;
}
