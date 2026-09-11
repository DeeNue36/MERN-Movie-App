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
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] = useCreateMovieMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageError }] = useUploadImageMutation();
    const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

    useEffect(() => {
        if (genres) {
            const fetchData = async() => {
                setIsDataFetched(true);
                setMovieData(prevData => ({
                    ...prevData,
                    genre: genres[0]?._id || ''
                }));
            };
            fetchData();
        }

    }, [genres]);


    return (
        <div className= 'container flex justify-center items-center mt-4'>
            <form>
                <p className="text-green-200 w-200 text-2xl font-bold mb-4">Create a Movie</p>

                <div className="mb-4">
                    <label className="block" htmlFor="movie name">
                        Name:
                    </label>
                </div>
            </form>
        </div>
    )
}
