import Problem from "../models/problem.model.js";
import TestCase from "../models/testCase.model.js";




export const createTestCase = async (req, res) => {

    try{

        const {problemId,input,expectedOutput,explanation,isHidden}= req.body; // getting hold of the data

        if(!problemId || !input || !expectedOutput ){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields: problemId, input and expectedOutput",
            })
        }

        const problem = await Problem.findById(problemId);

        if(!problem) {
            return res.status(404).son({
                success:false,
                message:"Problem not found",
            });
        }

        const testcase = await TestCase.create({
            problemId,
            input,
            expectedOutput,
            explanation,
            isHidden,
            createdBy:req.user._id,
        })

        return res.status(201).json({
            success:true,
            message:"Test case created successfully.",
            data: testcase,
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

    

};



export const getTestCasesByProblem = async (req, res) => {
    try {

        const { problemId } = req.params;

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const testCases = await TestCase.find({
            problemId,
            isHidden: false,
        }).sort({
            createdAt: 1,
        });

        return res.status(200).json({
            success: true,
            message: "Test cases fetched successfully.",
            data: testCases,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};




export const updateTestCase = async (req, res) => {
    try {

        const { id } = req.params;

        const testCase = await TestCase.findById(id);

        if (!testCase) {
            return res.status(404).json({
                success: false,
                message: "Test case not found.",
            });
        }

        const {
            input,
            expectedOutput,
            explanation,
            isHidden,
        } = req.body;

        if (input !== undefined) {
            testCase.input = input;
        }

        if (expectedOutput !== undefined) {
            testCase.expectedOutput = expectedOutput;
        }

        if (explanation !== undefined) {
            testCase.explanation = explanation;
        }

        if (typeof isHidden === "boolean") {
            testCase.isHidden = isHidden;
        }

        await testCase.save();

        return res.status(200).json({
            success: true,
            message: "Test case updated successfully.",
            data: testCase,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};




export const deleteTestCase = async (req, res) => {
    try {

        const { id } = req.params;

        const testCase = await TestCase.findById(id);

        if (!testCase) {
            return res.status(404).json({
                success: false,
                message: "Test case not found.",
            });
        }

        await testCase.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Test case deleted successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
