import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import moviesRoutes from './routes/moviesRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

//* Configuration
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8888;

//* Middlewares    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// * Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', moviesRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));