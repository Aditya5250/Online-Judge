import {SOURCE_FILE_NAMES} from "../constants.js";

//Python Handler

const pythonHandler ={
    language: "PYTHON",
    sourceFileName: SOURCE_FILE_NAMES.PYTHON,

    getCompileCommand(){
        return null;
    },

    // execution command
    getRunCommand(){
        return `python3 ${SOURCE_FILE_NAMES.PYTHON}`;
    },
}

export default pythonHandler;