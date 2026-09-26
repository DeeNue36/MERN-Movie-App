import { useEffect, useState } from 'react';
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

    const [movieData, setMovieData] = useState({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        // genre: '',
    });

    return (
        <div>UpdateMovie</div>
    )
}
