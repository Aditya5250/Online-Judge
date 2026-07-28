import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {getAIHints} from "../controllers/ai.controller.js";

const router =express.Router();


router.post(
    "/hints/:problemId",
    authMiddleware,
    getAIHints
);

export default router;