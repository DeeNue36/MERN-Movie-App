import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useGetSpecificMovieQuery,
    useUpdateMovieMutation,
    useUploadImageMutation,
    useDeleteMovieMutation
} from '../../redux/api/movies';
import { toast } from 'react-toastify';

export const UpdateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ movieData, setMovieData ] = useState({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        // genre: '',
    });

    const [ selectedImage, setSelectedImage ] = useState(null);
    const { data: initialMovieData } = useGetSpecificMovieQuery(id);
    const [ updateMovie, { isLoading: isUpdatingMovie } ] = useUpdateMovieMutation();
    const [ uploadImage, { isLoading: isUploadingImage, error: uploadImageError } ] = useUploadImageMutation();
    const [ deleteMovie ] = useDeleteMovieMutation();

    return (
        <div className='container flex justify-center items-center mt-4'>
            <form>
                <p className='text-green-200 w-200 text-2xl mb-4'>
                    Update Movie
                </p>
            </form>

        </div>
    )
}
