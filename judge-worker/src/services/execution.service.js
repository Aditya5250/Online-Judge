import languageRegistry from "../languageRegistry.js";
import fs from "fs/promises"

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

import { EXECUTION_TYPES } from "../constants/execution.constants.js";

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
            let type = EXECUTION_TYPES.COMPILATION_ERROR;
            if (compileResult.isTimeLimitExceeded) {
                type = EXECUTION_TYPES.TIME_LIMIT_EXCEEDED;
            } else if (compileResult.isMemoryLimitExceeded) {
                type = EXECUTION_TYPES.MEMORY_LIMIT_EXCEEDED;
            }

            return {
                ...compileResult,
                type,
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
            let type = EXECUTION_TYPES.RUNTIME_ERROR;
            if (executionResult.isTimeLimitExceeded) {
                type = EXECUTION_TYPES.TIME_LIMIT_EXCEEDED;
            } else if (executionResult.isMemoryLimitExceeded) {
                type = EXECUTION_TYPES.MEMORY_LIMIT_EXCEEDED;
            }

            return {
                ...executionResult,
                type,
            };
        }

        console.log("Execution finished.");

        return executionResult;
    } finally {
        await deleteTempDirectory(tempDirectory);
        // console.log("skipping dletion for debugging");
        
    }
};