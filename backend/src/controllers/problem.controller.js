import Problem from "../models/problem.model.js";
import slugify from "slugify";

export const createProblem = async (req, res) => {
    try {

        const { title, problemStatement, difficulty, tags } = req.body;

        //if any of the required fields are missing, return an error
        if (!title || !problemStatement || !difficulty || !tags) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: title, problemStatement, difficulty, tags, examples",
            })
        }

        const slug = slugify(title, {
            lower: true,
            strict: true,
            trim: true,
        })

        //check if problem with the same slug already exists in the database.......
        const existingProblem = await Problem.findOne(
            { slug }
        );

        if (existingProblem) {
            return res.status(409).json({ //409 = conflict
                success: false,
                message: "Problem already exists",
            })
        }

        //create a new problem in the database

        const problem = await Problem.create({
            title,
            slug,
            problemStatement,
            difficulty,
            tags,
            createdBy: req.user._id, //get the user id from the request object
        });

        return res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            
        });
    }
}





export const getAllProblems = async (req, res) => {

    try {
        // we fetch all problems from the database, but only fetch the title, slug, difficulty and tags fields, and sort them by createdAt in descending order
        const problems = await Problem.find(
            { isPublished: true }).select("title slug difficulty tags").sort({ createdAt: -1 });



        // if there's no data, we handle the empty state by returning an empty array instead of null or undefined, to avoid potential errors in the frontend
        if (!problems || problems.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No problems found",
                "data": []
            });
        }

        return res.status(200).json({
            success: true,
            message: "All problems fetched successfully",
            data: problems
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
           
        });
    }

}




export const getProblemBySlug = async (req, res) => {

    try {
        const { slug } = req.params;

        //fetch the problem by slug from the database, but only fetch the title, slug, difficulty, tags and problemStatement fields

        const problem = await Problem.findOne({
            slug,
            isPublished: true
        }).populate("createdBy", "Username");

        //if no problem is found we return problem not found error

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            data: problem
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            
        });
    }

}





export const updateProblem = async (req, res) => {
    try {
        const { slug } = req.params; // getting hold of the slug from the request parameters

        const problem = await Problem.findOne({ slug }); // finding the problem by slug


        //check if the problem exists, if not return a 404 error
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            })
        }

        const { title, problemStatement, difficulty, tags, examples, isPublished } = req.body; //extracting the req data, we will update only these fields

        //we update only the requestes fields and keep everything else the same,
        if (title) problem.title = title;
        if (problemStatement) problem.problemStatement = problemStatement;
        if (difficulty) problem.difficulty = difficulty;
        if (tags) problem.tags = tags;
        if (examples) problem.examples = examples;
        if (typeof isPublished === "boolean") problem.isPublished = isPublished; // we check if isPublished is a boolean, because it can be false


        await problem.save(); // we save the updated problem to the database;

        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            data: problem
        })
    }
    catch (err) {
        
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            
        });
    }
}





export const deleteProblem = async (req, res) => {

    try {
        const { slug } = req.params;

        const problem = await Problem.findOne({ slug });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            })
        }

        await problem.deleteOne(); // we delete the problem from the database

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",

        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

