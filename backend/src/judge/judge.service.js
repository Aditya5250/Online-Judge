import Submission from "../models/submission.model.js";
import TestCase from "../models/testCase.model.js";

import { executeSubmission } from "./execution.service.js";
import { compareOutput } from "./compareOutput.js";

import {SUBMISSION_STATUS} from "../constants/submissionStatus.js";
import {SUBMISSION_VERDICT} from "../constants/submissionVerdict.js";

const runAgainstTestCases = async({
    sourceCode,
    language,
    testCases,
})=>{
    let executionTime=0;
    let executionResult;
    for(const testCase of testCases){
        executionResult=await executeSubmission({
            language,
            sourceCode,
            input:testCase.input,
        });
        executionTime = executionResult.executionTime;
        /*
        ----------------------------------------------------------------------
        | Execution Failed
        ----------------------------------------------------------------------
        */
        
        if(!executionResult.success){
            return {
                passed:false,
                verdict:executionResult.type??SUBMISSION_VERDICT.RUNTIME_ERROR,
                executionTime:executionResult.executionTime,

            };
        }

        /*
        ----------------------------------------------------------------------
        | Compare Output
        ----------------------------------------------------------------------
        */
       
       console.log("Expected",testCase.expectedOutput);
       console.log("Actual",executionResult.stdout);
        
        const isCorrect =compareOutput(
            
            executionResult.stdout,
            testCase.expectedOutput
        );

        if(!isCorrect){
            return {
                passed:false,
                verdict:SUBMISSION_VERDICT.WRONG_ANSWER,
                executionTime:executionResult.executionTime,
            };
        }
    }

    // All test cases passed
    return {
        passed:true,
        verdict:SUBMISSION_VERDICT.ACCEPTED,
        executionTime:executionResult.executionTime,
    };
}


export const judgeSubmission = async (submissionId) => { // Responsibities: 1. Fetch submission. 2. Fetch hidden test cases. 3. Execute code against each hidden test case. 4. Compare outputs. 5. Update submission verdict & status.

    /*
    --------------------------------------------------------------------------
    | Fetch Submission
    --------------------------------------------------------------------------
    */

    const submission = await Submission.findById(submissionId);

    if (!submission) {
        throw new Error("Submission not found.");
    }

    /*
    --------------------------------------------------------------------------
    | Mark Submission as RUNNING
    --------------------------------------------------------------------------
    */

    submission.status = SUBMISSION_STATUS.RUNNING;
    await submission.save();

    /*
    --------------------------------------------------------------------------
    | Fetch Hidden Test Cases
    --------------------------------------------------------------------------
    */

    const hiddenTestCases = await TestCase.find({
        problemId: submission.problemId,
        isHidden: true,
    });

    if (!hiddenTestCases.length) {
        throw new Error("No hidden test cases found.");
    }

    /*
    --------------------------------------------------------------------------
    | Execute Every Hidden Test Case
    --------------------------------------------------------------------------
    */

    const result = await runAgainstTestCases({
        language: submission.language,
        sourceCode: submission.sourceCode,
        testCases: hiddenTestCases,
    });

    submission.executionTime = result.executionTime;
    submission.verdict = result.verdict;

    //update submission status
    const failedVerdicts =[SUBMISSION_VERDICT.COMPILATION_ERROR,SUBMISSION_VERDICT.RUNTIME_ERROR,SUBMISSION_VERDICT.TIME_LIMIT_EXCEEDED];

    submission.status=failedVerdicts.includes(submission.verdict)?SUBMISSION_STATUS.FAILED:SUBMISSION_STATUS.COMPLETED;

    await submission.save();

    return {

        status: submission.status,

        verdict: submission.verdict,

        executionTime: submission.executionTime,

    };

};