import express from "express";
import { createProblem, getAllProblems, getProblemBySlug, updateProblem, deleteProblem } from "../controllers/problem.controller.js";
import authorizeRoles from "../middleware/authorizeRole.middleware.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("ADMIN"), createProblem);// first authenticate the user(using authMiddleware), then check if the user is an admin(using authorizeRoles), then create the problem
router.get("/", getAllProblems);
router.get("/:slug", getProblemBySlug);
router.patch("/:slug", authMiddleware, authorizeRoles("ADMIN"), updateProblem); // first authenticate the user(using authMiddleware), then check if the user is an admin(using authorizeRoles), then update the problem
router.delete("/:slug", authMiddleware, authorizeRoles("ADMIN"), deleteProblem);// first authenticate the user(using authMiddleware), then check if the user is an admin(using authorizeRoles), then delete the problem

export default router;