import Movie from "../models/movieSchema.js";

export const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

export const getSpecificMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({error: "Movie not found"});
        }
        res.json(movie);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

// export { createMovie };