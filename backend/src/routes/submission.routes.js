import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {createSubmission, getMySubmissions, runCode} from "../controllers/submission.controller.js";

const router =express.Router();

router.post("/run",runCode);
router.post("/",authMiddleware,createSubmission);
router.get("/my",authMiddleware,getMySubmissions);


export default router;