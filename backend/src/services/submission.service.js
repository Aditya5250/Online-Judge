
import Submission from "../models/submission.model.js";
import Problem from "../models/problem.model.js";

// Create Submission Service :

export const createSubmissionService = async (userId, submissionData) => { // create submission service will 1. validate the requested problem, 2. If problem exists, it will create a new submission and then will return the created submission

    const { problemId, language, sourceCode } = submissionData;

    //check if the problem exist in the database or not
    const problem = await Problem.findById(problemId);

    if (!problem) {
        throw new Error("Problem not found");

    }

    // we now create new submission
    const submission = await Submission.create({
        userId,
        problemId,
        language,
        sourceCode,
    });

    return submission;
}



//Get User Submissions Service :
export const getUserSubmissionService = async (userId) => {
    const submissions = await Submission.find(
        { userId }
    ).populate(
        {
            path:"problemId",
            select: "title slug difficulty"
        }
    ).sort(
        {
            createdAt: -1
        }
    );

    return submissions;
} 