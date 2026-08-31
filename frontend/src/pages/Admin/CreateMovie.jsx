import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation, useUploadImageMutation } from '../../redux/api/movies'
import { useFetchGenresQuery } from '../../redux/api/genre'
import { toast } from 'react-toastify';

export const CreateMovie = () => {

    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: '',
        year: '',
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] = useCreateMovieMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageError }] = useUploadImageMutation();
    const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

    useEffect(() => {
        if(genres) {
            setMovieData((prevData) => ({
                ...prevData,
                genre: genres[0]?._id || ''
            }))
        }

    }, [genres])


    return (
        <div className= 'container flex justify-center items-center mt-4'>
            <form>
                <p className="text-green-200 w-200 text-2xl font-bold mb-4">Create a Movie</p>
            </form>
        </div>
    )
}
