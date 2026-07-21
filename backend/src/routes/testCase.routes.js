import express from 'express';
import {authMiddleware} from '../middleware/auth.middleware.js';
import authorizeRoles from '../middleware/authorizeRole.middleware.js';
import {createTestCase, getTestCasesByProblem, updateTestCase, deleteTestCase} from '../controllers/testCase.controller.js';

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("ADMIN"), createTestCase);
router.get("/problem/:problemId", getTestCasesByProblem);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), updateTestCase);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteTestCase);


export default router;