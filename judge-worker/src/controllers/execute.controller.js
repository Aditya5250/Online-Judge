import { executeSubmission } from "../services/execution.service.js";

export const execute = async (req, res) => {
    try {
        const {
            language,
            sourceCode,
            input = "",
        } = req.body;

        if (!language || !sourceCode) {
            return res.status(400).json({
                success: false,
                message: "language and sourceCode are required.",
            });
        }

        const result = await executeSubmission({
            language,
            sourceCode,
            input,
        });

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("============ CONTROLLER CATCH ===========================");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};