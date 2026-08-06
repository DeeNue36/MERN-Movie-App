import Genre from "../models/genreSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({error: "Name is required"});
        }
        const existingGenre = await Genre.findOne({ name });
        if (existingGenre) {
            return res.json({error: "Genre already exists"});
        }
        const genre = await new Genre({name}).save();
        res.json(genre);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
});

export const updateGenre = asyncHandler( async(req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const genre = await Genre.findOne({_id: id});
        if (!genre) {
            return res.status(404).json({error: "Genre not found"});
        }
        genre.name = name;
        const updatedGenre = await genre.save();
        res.json(updatedGenre);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export const deleteGenre = asyncHandler( async(req, res) => {
    try {
        const { id } = req.params;

        const deletedGenre = await Genre.findByIdAndDelete(id);
        if (!deletedGenre) {
            return res.status(404).json({error: "Genre not found"});
        }
        res.json(deletedGenre);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export const getAllGenres = asyncHandler( async(req, res) => {
    try {
        const genres = await Genre.find({});
        res.json(genres);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

export const readGenre = asyncHandler( async(req, res) => {
    try {
        const { id } = req.params;
        const genre = await Genre.findOne({_id: id}); // const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({error: "Genre not found"});
        }
        res.json(genre);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});