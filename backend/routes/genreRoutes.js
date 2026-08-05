import express from "express";

const router = express.Router();

//controllers
import { createGenre, updateGenre, deleteGenre, getAllGenres } from "../controllers/genreController.js";

//middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
router.route('/').post(authenticate, authorizeAdmin, createGenre);
router.route('/:id').put(authenticate, authorizeAdmin, updateGenre);
router.route('/:id').delete(authenticate, authorizeAdmin, deleteGenre);
router.route('/genres').get(authenticate, authorizeAdmin, getAllGenres);

export default router;