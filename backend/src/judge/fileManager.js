import fs from "fs/promises"; //for using sync await format we use fs/promises
import path from "path";
import os from "os";
import crypto from "crypto";


//temporary folder creation

export const createTempDirectory= async()=>{
    const folderName=crypto.randomUUID(); // it generates unique folder name
    const tempDirectory=path.join(os.tmpdir(),folderName); // OS-specific tempory directory (for example if window we use \tmp (ex: C:\Users\....\temp).... and in linux we use /tmp)

    await fs.mkdir(tempDirectory,{
        recursive:true,
    });

    return tempDirectory;
}

// the code we get from user (source code), we will write it in a file

export const writeSourceCode= async(directory,fileName,sourceCode)=>{
    
    const filePath =path.join(directory,fileName);

    await fs.writeFile(filePath,sourceCode,"utf-8");

    return filePath;

};

export const getExecutablePath = (directory,executableName)=>{
    return path.join(directory,executableName);
};  // a helper function to return executable path... we will use it 


// once execution is completed, we should delete the temporary folder

export const deleteTempDirectory= async(directory)=>{
    await fs.rm(directory,{
        recursive:true,
        force:true,
    })
}


