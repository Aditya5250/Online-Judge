import { createSubmissionService, getUserSubmissionService } from "../services/submission.service.js";
import { judgeSubmission } from "../judge/judge.service.js";

// Create Submission Controller

export const createSubmission = async (req, res) => { // it will handle creation of the new submissions.
    try {
        const userId = req.user._id; // logged-in user id gets stored in userId by auth middleware;

        const submission = await createSubmissionService( //called createSubmissionServices to create a new submission
            userId,
            req.body
        );
        const result=await judgeSubmission(submission._id); //called judgeSubmission to judge the submission

        return res.status(201).json({ // final response
            success: true,
            message: "Submission judged successfully",
            data: result,
        });
    }
    catch (err) {
        console.error("Create Submission Error: ", err);

        if(err.message === "Problem not found"){
            return res.status(404).json({
                success:false,
                message: err.message,
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}


// Get Users Submission Controller: 

export const getMySubmissions= async(req,res)=>{ // will return all the submissions made by the authenticated user;
 
    try{

        const userId=req.user._id;

        //fetching all the submission from database by userId;
        const submissions = await getUserSubmissionService(userId);

        res.status(200).json({
            success: true,
            message:"Submissions fetched successfully.",
            data:submissions,
        });


    }
    catch(err){

        console.error("Fetch Submission Error: ",err);
        
        if(err.message === "Problem not found"){
            return res.status(404).json({
                success:false,
                message: err.message,
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}