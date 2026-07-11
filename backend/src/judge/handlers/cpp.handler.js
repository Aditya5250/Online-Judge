import {SOURCE_FILE_NAMES, EXECUTABLE_NAMES} from "../constants.js";

//CPP Handler

const cppHandler ={ 
    language: "CPP",
    sourceFileName: SOURCE_FILE_NAMES.CPP,
    executableName: EXECUTABLE_NAMES.CPP,

    // compilation command for c++
    getCompileCommand(){
        return `g++ "${SOURCE_FILE_NAMES.CPP}" -o "${EXECUTABLE_NAMES.CPP}"`;
    },

    // execution command
    getRunCommand(){
        return `"./${EXECUTABLE_NAMES.CPP}"`;
    },
}

export default cppHandler;