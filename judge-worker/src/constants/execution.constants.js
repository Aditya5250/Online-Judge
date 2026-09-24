// Supported Programming Languages

export const SUPPORTED_LANGUAGES = {
    CPP: "CPP",
    JAVA: "JAVA",
    PYTHON: "PYTHON",
};

// Docker Images

export const DOCKER_IMAGES = {
    CPP: "gcc:latest",
    JAVA: "eclipse-temurin:17",
    PYTHON: "python:3.11",
};

// Source File Names

export const SOURCE_FILE_NAMES = {
    CPP: "main.cpp",
    JAVA: "Main.java",
    PYTHON: "main.py",
};

// Executable Names

export const EXECUTABLE_NAMES = {
    CPP: "main",
};

// Execution Types / Verdicts

export const EXECUTION_TYPES = {
    COMPILATION_ERROR: "COMPILATION_ERROR",
    RUNTIME_ERROR: "RUNTIME_ERROR",
    TIME_LIMIT_EXCEEDED: "TIME_LIMIT_EXCEEDED",
    MEMORY_LIMIT_EXCEEDED: "MEMORY_LIMIT_EXCEEDED",
};

// Language-Specific Execution Profiles
export const LANGUAGE_CONFIG = {
    [SUPPORTED_LANGUAGES.CPP]: {
        timeout: 5000,
        compileTimeout: 10000,
        memoryLimit: "512m", // Preserved known-working 512m
        compileMemoryLimit: "512m",
        cpuLimit: "1",
    },
    [SUPPORTED_LANGUAGES.JAVA]: {
        timeout: 5000,
        compileTimeout: 10000,
        memoryLimit: "512m", // Headroom for JVM runtime
        compileMemoryLimit: "512m",
        cpuLimit: "1",
    },
    [SUPPORTED_LANGUAGES.PYTHON]: {
        timeout: 5000,
        compileTimeout: 5000,
        memoryLimit: "256m",
        compileMemoryLimit: "256m",
        cpuLimit: "1",
    },
};

// Default Execution Limits (Fallback)

export const EXECUTION_LIMITS = {
    TIMEOUT: 5000,
    MEMORY_LIMIT: "512m",
    CPU_LIMIT: "1",
};