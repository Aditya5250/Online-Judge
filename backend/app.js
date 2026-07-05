import express from 'express';
import cors from 'cors';
import healthroutes from './src/routes/health.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import problemRoutes from './src/routes/problem.routes.js';
import testCaseRoutes from './src/routes/testCase.routes.js';
import submissionRoutes from "./src/routes/submission.routes.js";


const app = express();

//middlewares
app.use(cors());
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

export default app;
