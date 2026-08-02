import languageRegistry from "../languageRegistry.js";

import {
    createTempDirectory,
    writeSourceCode,
    deleteTempDirectory,
    getHostWorkspace,
} from "../utils/fileManager.js";

import {
    compileInDocker,
    runInDocker,
} from "./docker.service.js";

/**
 * Execution result types.
 * These values must match the backend submission verdict constants.
 */
const EXECUTION_TYPES = {
    COMPILATION_ERROR: "COMPILATION_ERROR",
    RUNTIME_ERROR: "RUNTIME_ERROR",
    TIME_LIMIT_EXCEEDED: "TIME_LIMIT_EXCEEDED",
};

/**
 * Executes a code submission.
 */
export const executeSubmission = async ({
    language,
    sourceCode,
    input = "",
}) => {
    const handler = languageRegistry[language];

    if (!handler) {
        throw new Error("Unsupported programming language");
    }

    const tempDirectory = await createTempDirectory();

    const hostWorkspace = getHostWorkspace(tempDirectory);

    console.log("Host Workspace:", hostWorkspace);

    try {
        // Write source code
        await writeSourceCode(
            tempDirectory,
            handler.sourceFileName,
            sourceCode
        );

        console.log("Source file written.");

        // Build commands
        const compileCommand = handler.getCompileCommand();
        const runCommand = handler.getRunCommand();


        /*
        ---------------------------------------------------------
        | Compilation
        ---------------------------------------------------------
        */

        const compileResult = await compileInDocker({
            language,
            workingDirectory: hostWorkspace,
            compileCommand,
        });

        if (!compileResult.success) {
            return {
                ...compileResult,
                type: EXECUTION_TYPES.COMPILATION_ERROR,
            };
        }

        console.log("Compiled finished.");

        /*
        ---------------------------------------------------------
        | Execution
        ---------------------------------------------------------
        */

        const executionResult = await runInDocker({
            language,
            workingDirectory: hostWorkspace,
            runCommand,
            input,
        });


        if (!executionResult.success) {

            const isTimeLimitExceeded =
                executionResult.stderr
                    ?.toLowerCase()
                    .includes("time limit exceeded");

            return {
                ...executionResult,
                type: isTimeLimitExceeded
                    ? EXECUTION_TYPES.TIME_LIMIT_EXCEEDED
                    : EXECUTION_TYPES.RUNTIME_ERROR,
            };
        }

        console.log("Execution finished.");

        return executionResult;
    } finally {
        await deleteTempDirectory(tempDirectory);
    }
};