import dns from 'dns';
dns.setServers(['8.8.8.8','8.8.4.4']);
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './app.js';
import mongoose from 'mongoose';


dotenv.config();

const PORT = process.env.PORT || 5000;


connectDB();

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})

