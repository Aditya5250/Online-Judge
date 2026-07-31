import {
    SOURCE_FILE_NAMES,
} from "../constants/execution.constants.js";

// Java Handler

const javaHandler = {
    language: "JAVA",

    sourceFileName: SOURCE_FILE_NAMES.JAVA,

    
    getCompileCommand() {
        return `javac ${SOURCE_FILE_NAMES.JAVA}`;
    },

  
    getRunCommand() {
        return "java Main";
    },
};

export default javaHandler;