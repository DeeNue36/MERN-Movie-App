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
    return (
        <div>UpdateMovie</div>
    )
}
