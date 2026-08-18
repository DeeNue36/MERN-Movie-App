import express from "express";

const router = express.Router();

// Controllers
import { createMovie, 
    updateMovie, 
    // deleteMovie, 
    getAllMovies, 
    getSpecificMovie,
    createMovieReview
} from "../controllers/movieController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkID.js";

// Public Routes
router.get('/all-movies', getAllMovies);
router.get('/movie/:id', getSpecificMovie);

// Private/Restricted Routes
router.post('/:id/reviews', authenticate, checkID, createMovieReview);

// Admin Routes
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);
router.put('/update-movie/:id', authenticate, authorizeAdmin, updateMovie);

export default router;