import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorizeRole.middleware.js";
import { getAdminDashboard } from "../controllers/adminDashboard.controller.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN"),
    getAdminDashboard
);

export default router;