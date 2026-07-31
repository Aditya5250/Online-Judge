import express from "express";

import { execute } from "../controllers/execute.controller.js";

const router = express.Router();

router.post("/", execute);

export default router;