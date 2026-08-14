import express from "express";

const router = express.Router();

// Controllers
import { createMovie, 
    updateMovie, 
    // deleteMovie, 
    getAllMovies, 
    getSpecificMovie
    // readMovie 
} from "../controllers/movieController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkID.js";

// Public Routes
router.get('/all-movies', getAllMovies);
router.get('/movie/:id', getSpecificMovie);

// Private Routes

// Admin Routes
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);
router.put('/update-movie/:id', authenticate, authorizeAdmin, updateMovie);

export default router;