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

export const updateMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedMovie) {
            return res.status(404).json({error: "Movie not found"});
        }
        res.json(updatedMovie);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

export const createMovieReview = async (req, res) => {
    try{
        const {rating, comment} = req.body;

        const movie = await Movie.findById(req.params.id);
        if(movie) {
            const alreadyReviewed = movie.reviews.find((r) => r.user.toString() === req.user._id.toString());

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Movie already reviewed");
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            movie.reviews.push(review);
            movie.numReviews = movie.reviews.length;
            movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

            const updatedMovie = await movie.save();
            res.status(201).json(updatedMovie, {message: "Review added"});
        }
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({error: error.message});
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteMovie = await Movie.findByIdAndDelete(id);
        if (!deleteMovie) {
            return res.status(404).json({error: "Movie not found"});
        }

        res.json({message: "Movie deleted successfully"}, deleteMovie);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { movieId, reviewId } = req.params;

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({error: "Movie not found"});
        }

        const review = movie.reviews.findIndex((r) => r._id.toString() === reviewId); // Find the index of the review to be deleted and check if its id matches the reviewId
        if (review === -1) {
            return res.status(404).json({error: "Review not found"});
        }

        movie.reviews.splice(review, 1);
        movie.numReviews = movie.reviews.length;
        movie.rating = movie.reviews.length > 0 ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length : 0;

        await movie.save();
        res.json({message: "Review deleted successfully"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export const getNewMovies = async (req, res) => {
    try {
        const newMovies = await Movie.find().sort({createdAt: -1}).limit(10);
        res.json(newMovies);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export const getTopMovies = async (req, res) => {
    try {
        const topMovies = await Movie.find().sort({numReviews: -1}).limit(10);
        res.json(topMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export const getRandomMovies = async (req, res) => {
    try {
        const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
        res.json(randomMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

// export { createMovie, getAllMovies, getSpecificMovie, updateMovie, createMovieReview, deleteMovie, deleteComment, getNewMovies, getTopMovies, getRandomMovies };