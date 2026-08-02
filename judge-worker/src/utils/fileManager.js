import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const CONTAINER_WORKSPACE = process.env.WORKSPACE_ROOT || "/workspace";

const HOST_WORKSPACE = process.env.HOST_WORKSPACE_ROOT || "/home/ec2-user/judge-workspace";

/**
 * Creates a unique temporary working directory
 * for a single code execution.
 */
export const createTempDirectory = async () => {
    const folderName = crypto.randomUUID();

    const tempDirectory = path.join(CONTAINER_WORKSPACE, folderName);

    await fs.mkdir(tempDirectory, {
        recursive: true,
    });

    return tempDirectory;
};

export const getHostWorkspace = (directory) => {
    const folderName = path.basename(directory);

    return path.join(HOST_WORKSPACE, folderName);
};

/**
 * Writes the user's source code
 * into the working directory.
 */
export const writeSourceCode = async (
    directory,
    fileName,
    sourceCode
) => {
    const filePath = path.join(directory, fileName);

    await fs.writeFile(filePath, sourceCode, "utf-8");

    return filePath;
};

/**
 * Returns the executable path.
 */
export const getExecutablePath = (
    directory,
    executableName
) => {
    return path.join(directory, executableName);
};

/**
 * Deletes the temporary working directory.
 */
export const deleteTempDirectory = async (
    directory
) => {
    await fs.rm(directory, {
        recursive: true,
        force: true,
    });
};