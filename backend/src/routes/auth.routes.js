import express from "express";
import {signup,login} from "../controllers/auth.controller.js";
import {getCurrentUser} from "../controllers/me.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router=express.Router();

router.post('/signup',signup); //  signup gets added to the base url /api/auth/ in app.js to become /api/auth/signup on the frontend
router.post('/login',login); //  login gets added to the base url /api/auth/ in app.js to become /api/auth/login on the frontend

router.get('/me',authMiddleware,getCurrentUser); //  me gets added to the base url /api/auth/ in app.js to become /api/auth/me on the frontend')

export default router; 