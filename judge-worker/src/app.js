import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import executeRoutes from "./routes/execute.routes.js"

const app = express();

// =========================
// Global Middleware
// =========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// Routes
// =========================

app.use("/health", healthRoutes);

app.use("/api/execute",executeRoutes)

// =========================
// 404 Handler
// =========================

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

export default app;