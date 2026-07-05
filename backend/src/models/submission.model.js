import mongoose from "mongoose";
import { SUBMISSION_STATUS} from "../constants/submissionStatus.js";
import {SUBMISSION_VERDICT} from "../constants/submissionVerdict.js";

const submissionSchema = new mongoose.Schema(
    {
        // User who submitted the solution
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Problem for which the submission was made
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true,
        },

        // Programming language used
        language: {
            type: String,
            enum: ["CPP", "JAVA", "PYTHON"],
            required: true,
        },

        // Complete source code submitted by the user
        sourceCode: {
            type: String,
            required: true,
            trim: true,
        },

       
        status: {
            type: String,
            enum: Object.values(SUBMISSION_STATUS),
            default: "PENDING",
        },

       
        verdict: {
            type: String,
            enum: Object.values(SUBMISSION_VERDICT),
            default: null,
        },

        
        executionTime: {
            type: Number,
            default: 0,
        },

       
        memoryUsed: {
            type: Number,
            default: 0,
        },

       
        passedTestCases: {
            type: Number,
            default: 0,
        },

        
        totalTestCases: {
            type: Number,
            default: 0,
        },

        
        errorMessage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// we add indexes, without indexes mongoDb will scan entire collection

submissionSchema.index({ userId: 1 });

submissionSchema.index({ problemId: 1 });

submissionSchema.index({ status: 1 });

export default mongoose.model("Submission", submissionSchema);