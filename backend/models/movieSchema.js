import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    year: {
        type: Number,
        required: true,
    },

    genre: {
        type: ObjectId,
        ref: 'Genre',
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    cast: [{
        type: String
    }],

    reviews: [reviewSchema],
    totalReviews:{type: Number, default: 0}
}, {timestamps: true}
);

export default mongoose.model('Movie', movieSchema);