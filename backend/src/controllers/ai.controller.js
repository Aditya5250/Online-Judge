import AIHint from "../models/aiHint.model.js";
import Problem from "../models/problem.model.js";
import { generateHints } from "../services/ai.service.js";

export const getAIHints = async (req, res) => {
    try {

        const { problemId } = req.params;

        //Checking cache
        const cachedHints = await AIHint.findOne({ problemId });

        if (cachedHints) {
            return res.status(200).json({
                success: true,
                cached: true,
                data: cachedHints.hints,
            });
        }


        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        // Generating hints using Gemini
        const result = await generateHints(problem);

        // Saving to MongoDB
        const aiHint = await AIHint.create({
            problemId,
            hints: result.hints,
        });

        return res.status(200).json({
            success: true,
            cached: false,
            data: aiHint.hints,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate AI hints.",
        });

    }
};