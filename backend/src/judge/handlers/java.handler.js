import {SOURCE_FILE_NAMES} from "../constants.js";

//JAVA Handler

const javaHandler ={
    language: "JAVA",
    sourceFileName: SOURCE_FILE_NAMES.JAVA,

    // compilation command for java
    getCompileCommand(){
        return `javac ${SOURCE_FILE_NAMES.JAVA}`;
    },

    // execution command
    getRunCommand(){
        return "java Main";;
    },
}

export default javaHandler;