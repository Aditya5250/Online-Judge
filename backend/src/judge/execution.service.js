import languageRegistry from "./languageRegistry.js";
import {createTempDirectory, writeSourceCode, getExecutablePath, deleteTempDirectory} from "./fileManager.js";

import {compileInDocker,runInDocker} from "./docker.service.js"

export const executeSubmission=async({language,sourceCode,input})=>{

    const handler = languageRegistry[language]; // language = CPP, PYTHON or JAVA,.... handle stores cpp.handler.js/python.handler.js or java.hander.js function according to language we get from user

    if(!handler){ // if no handler, it means there is no code or code is in different language (not CPP, PYTHON AND JAVA)
        throw new Error("Unsupported programming language");
    }

    //creating temporary directory

    const tempDirectory= await createTempDirectory();

    try{

        //source file
        const sourceFilePath= await writeSourceCode(tempDirectory, handler.sourceFileName, sourceCode); // writeSourceCode is a function we created in filemanger.js.. it will create a file and store the code we get from user in it

        //c++ needs an executable
        const executablePath= handler.executableName?getExecutablePath(tempDirectory,handler.executableName):null; //only cpp needs executable path so if language is cpp executablePath will get executableName.. other languages will give null to executablePath 

        // generating compile command

        const compileCommand= handler.getCompileCommand(); // getCompileCommand function is in the language handle files(cpp.handler.js/python.handler.js/java.handler.js).. handler variable here stores those file according to language it get from use... so this line will compile thesorcecode

        //generating run command 
        const runCommand= handler.getRunCommand();

        //execute inside docker

        const compileResult = await compileInDocker({
            language,
            workingDirectory: tempDirectory,
            compileCommand,
        });
        if(!compileResult.success){ // if compilation fails, it will throw error
            return compileResult;
        }

        const executionResult = await runInDocker({
            language,
            workingDirectory: tempDirectory,
            runCommand,
            input,
        })
        return executionResult;

    


    } 
    finally{

        //cleaning the temp file
        deleteTempDirectory(tempDirectory);

    }

    

}