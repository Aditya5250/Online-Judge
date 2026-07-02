import express from 'express';
import cors from 'cors';
import healthroutes from './src/routes/health.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import problemRoutes from './src/routes/problem.routes.js';


const app = express();

//middlewares
app.use(cors());
app.use(express.json());


//routes
app.use('/api/health', healthroutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);

export default app;
