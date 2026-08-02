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
           if(!origin){
                return callback(null, true);
           }
           if(allowedOrigins.includes(origin)){
                return callback(null, true);
           }
           return callback(new Error(`Origin ${origin} not allowed by CORS`));
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

export default app;
