//supported programming languages
export const SUPPORTED_LANGUAGES ={
    CPP:"CPP",
    JAVA:"JAVA",
    PYTHON:"PYTHON",
};

//Docker Images

export const DOCKER_IMAGES = {
    CPP:"gcc:latest",
    JAVA:"eclipse-temurin:17",
    PYTHON:"python:3.11",
};


//Source File Names
export const SOURCE_FILE_NAMES = {
    CPP:"main.cpp",
    JAVA:"Main.java",
    PYTHON:"main.py",
}

// Executable Names

export const EXECUTABLE_NAMES ={
    CPP:"main",
}


// execution limits (to prevent infinite loops)

export const EXECUTION_LIMITS ={
    TIMEOUT:5000,
    MEMORY_LIMIT:"256m",
    CPU_LIMIT:"1",
};

