import { apiSlice } from "./apiSlice";
import { MOVIES_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => `${MOVIES_URL}/all-movies`,
        }),

        createMovie: builder.mutation({
            query: (newMovie) => ({
                url: `${MOVIES_URL}/create-movie`,
                method: "POST",
                body: newMovie
            }),
        }),

        updateMovie: builder.mutation({
            query: ({id, updatedMovie}) => ({
                url: `${MOVIES_URL}/update-movie/${id}`,
                method: "PUT",
                body: updatedMovie
            })
        }),

        addMovieReview: builder.mutation({
            query: ({id, rating, review}) => ({
                url: `${MOVIES_URL}/${id}/reviews`,
                method: "POST",
                body:{ rating, id, review }
            })
        }),

        deleteMovieReview: builder.mutation({
            query: ({movieId, reviewId}) => ({
                url: `${MOVIES_URL}/delete-comment`,
                method: "DELETE",
                body: {movieId, reviewId}
            })
        }),

        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `${MOVIES_URL}/delete-movie/${id}`,
                method: "DELETE"
            })
        }),

        getSpecificMovie: builder.query({
            query: (id) => ({
                url: `${MOVIES_URL}/movie/${id}`,
                method: "GET"
            })
        }),

        uploadImage: builder.mutation({
            query: (formData) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: formData
            })
        }),

        getNewMovies: builder.query({
            query: () => `${MOVIES_URL}/new-movies`
        }),

        getTopMovies: builder.query({
            query: () => `${MOVIES_URL}/top-movies`
        }),

        getRandomMovies: builder.query({
            query: () => `${MOVIES_URL}/random-movies`
        })
    })
});

export const {
    useGetAllMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useAddMovieReviewMutation,
    useDeleteMovieReviewMutation,
    useDeleteMovieMutation,
    useGetSpecificMovieQuery,
    useUploadImageMutation,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery
} = moviesApiSlice