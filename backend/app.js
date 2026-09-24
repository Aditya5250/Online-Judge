import express from 'express';
import cors from 'cors';
import healthroutes from './src/routes/health.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import problemRoutes from './src/routes/problem.routes.js';
import testCaseRoutes from './src/routes/testCase.routes.js';
import submissionRoutes from "./src/routes/submission.routes.js";
import leaderboardRoutes from "./src/routes/leaderboard.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";
import adminDashboardRoute from "./src/routes/adminDashboard.routes.js"

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://judgex.live",
    "https://www.judgex.live",
    "https://api.judgex.live",
]

//middlewares
app.use(
    cors({
        origin: (origin, callback) => {
           if (!origin) {
                return callback(null, true);
           }
           if (allowedOrigins.includes(origin)) {
                return callback(null, true);
           }
           const corsError = new Error(`Origin ${origin} not allowed by CORS`);
           corsError.statusCode = 403;
           return callback(corsError);
        },
        credentials: true,
    })
);

app.use(express.json());


//Health Routes
app.use('/api/health', healthroutes);

//Authentication Routes
app.use('/api/auth', authRoutes);

//Problem Routes
app.use('/api/problems', problemRoutes);

//Test Case Routes
app.use('/api/testcases', testCaseRoutes); 

//Submission Routes
app.use('/api/submissions',submissionRoutes);

//Leaderboard Routes
app.use('/api/leaderboard',leaderboardRoutes);

//Ai Hint Route
app.use("/api/ai", aiRoutes);

// Admin Dashboard Route
app.use("/api/admin/dashboard", adminDashboardRoute);

// Centralized Express Error Handling Middleware
app.use((err, req, res, next) => {
    // Log detailed diagnostics server-side
    console.error("[Backend Error]", {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Handle CORS error cleanly without leaking stack trace
    if (err.statusCode === 403 || (err.message && err.message.includes("not allowed by CORS"))) {
        return res.status(403).json({
            success: false,
            message: "CORS request blocked: Origin not allowed",
        });
    }

    const statusCode = err.statusCode || (typeof err.status === "number" ? err.status : 500);

    return res.status(statusCode).json({
        success: false,
        message: isProduction && statusCode === 500
            ? "Internal server error"
            : (err.message || "Internal server error"),
        ...(isProduction ? {} : { stack: err.stack }),
    });
});

export default app;
