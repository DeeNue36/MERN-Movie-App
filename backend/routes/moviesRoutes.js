import express from "express";

const router = express.Router();

// Controllers
import { createMovie, 
    updateMovie, 
    deleteMovie, 
    getAllMovies, 
    getSpecificMovie,
    createMovieReview,
    deleteComment,
    getNewMovies,
    getTopMovies,
    getRandomMovies
} from "../controllers/movieController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkID.js";

// Public Routes
router.get('/all-movies', getAllMovies);
router.get('/movie/:id', getSpecificMovie);
router.get('/new-movies', getNewMovies);
router.get('/top-movies', getTopMovies);
router.get('/random-movies', getRandomMovies)

// Private/Restricted Routes
router.post('/:id/reviews', authenticate, checkID, createMovieReview);

// Admin Routes
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);
router.put('/update-movie/:id', authenticate, authorizeAdmin, updateMovie);
router.delete('/delete-movie/:id', authenticate, authorizeAdmin, deleteMovie);
router.delete('/delete-comment', authenticate, authorizeAdmin, deleteComment);


export default router;