import {
    SOURCE_FILE_NAMES,
    EXECUTABLE_NAMES,
} from "../constants/execution.constants.js";

// C++ Handler

const cppHandler = {
    language: "CPP",

    sourceFileName: SOURCE_FILE_NAMES.CPP,

    executableName: EXECUTABLE_NAMES.CPP,

    
    getCompileCommand() {
        return `g++ "${SOURCE_FILE_NAMES.CPP}" -o "${EXECUTABLE_NAMES.CPP}"`;
    },

    
    getRunCommand() {
        return `./${EXECUTABLE_NAMES.CPP}`;
    },
};

export default cppHandler;