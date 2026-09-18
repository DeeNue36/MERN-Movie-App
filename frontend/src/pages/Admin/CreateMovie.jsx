import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation, useUploadImageMutation } from '../../redux/api/movies'
import { useFetchGenresQuery } from '../../redux/api/genre'
import { toast } from 'react-toastify';

export const CreateMovie = () => {

    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: '',
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] = useCreateMovieMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageError }] = useUploadImageMutation();
    const { data: genres = [], isLoading: isLoadingGenres } = useFetchGenresQuery();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMovieData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleCreateMovie = async () => {
        try {
            const selectedGenre = movieData.genre || genres[0]?._id;

            if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast || !selectedImage) {
                toast.error('Please fill all the required fields');
                return;
            }

            const formData = new FormData();
            formData.append('image', selectedImage);

            const uploadImageResponse = await uploadImage(formData).unwrap();

            await createMovie({
                name: movieData.name,
                year: Number(movieData.year),
                description: movieData.detail,
                cast: movieData.cast,
                genre: movieData.genre || selectedGenre,
                image: uploadImageResponse.image
            }).unwrap();

            toast.success('Movie created successfully');
            navigate('/admin/movies-list');

            // Optional – Reset the form
            setMovieData({
                name: '',
                year: 0,
                detail: '',
                cast: [],
                rating: 0,
                image: null,
                genre: ''
            });

        } catch (error) {
            console.error('Image upload failed: ', uploadImageError);
            console.log('Failed to create movie: ', createMovieError);
            toast.error(
                error?.data?.message ||
                uploadImageError?.data?.message ||
                error?.message ||
                'Failed to upload or create movie'
            );
        }
    };


    return (
        <div className= 'container flex justify-center items-center mt-4'>
            <form>
                <p className="text-green-200 w-200 text-2xl font-bold mb-4">Create a Movie</p>

                {/* Movie Name */}
                <div className="mb-4">
                    <label className="block">
                        Name:
                        <input 
                            type="text" 
                            name='name' 
                            value={movieData.name} 
                            onChange={handleChange}
                            className='border px-2 py-1 w-full'
                        />
                    </label>
                </div>

                {/* Movie Year */}
                <div className="mb-4">
                    <label className="block">
                        Year:
                        <input 
                            type="number" 
                            name='year' 
                            value={movieData.year} 
                            onChange={handleChange}
                            className='border px-2 py-1 w-full'
                        />
                    </label>
                </div>

                {/* Movie Details */}
                <div className="mb-4">
                    <label className="block">
                        Details:
                        <textarea 
                            name="detail" 
                            id="details" 
                            value={movieData.detail}
                            onChange={handleChange}
                            className="border px-2 py-1 w-full"
                        >
                        </textarea>
                    </label>
                </div>

                {/* Movie Cast */}
                <div className="mb-4">
                    <label className="block">
                        Cast (comma-separated):
                        <input 
                            type="text" 
                            name='cast' 
                            value={movieData.cast.join(', ')} 
                            onChange={(e) => setMovieData({...movieData, cast: e.target.value.split(', ')})}
                            className='border px-2 py-1 w-full'
                        />
                    </label>
                </div>

                {/* Movie Genre */}
                <div className="mb-4">
                    <label className="block">
                        Genre:
                        <select 
                            name="genre" 
                            id="genre" 
                            value={movieData.genre || genres?.[0]?._id || ''} 
                            onChange={handleChange}
                            className="border px-2 py-1 w-full"
                        >
                            {isLoadingGenres ? (
                                <option>Loading Genres...</option>
                            ) : (
                                genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>
                </div>

                {/* Movie Image */}
                <div className="mb-4">
                    <label 
                        style={!selectedImage ? {cursor: 'pointer', border: '1px solid #888', borderRadius: '5px', padding: '8px'} : {border: '0', borderRadius: '0', padding: '0'}}
                    >
                        {!selectedImage && "Upload Image"}
                        <input 
                            type="file" 
                            id="movie-image"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleImageChange}
                            style={{display: !selectedImage ? 'none' : 'block'}}
                        />
                    </label>
                </div>

                <button 
                    type="button" 
                    onClick={handleCreateMovie} 
                    className="bg-teal-500 text-white py-2 px-4 rounded"
                    disabled={isCreatingMovie || isUploadingImage}
                >
                    {isCreatingMovie || isUploadingImage ? 'Creating...' : 'Create Movie'}
                </button>

            </form>
        </div>
    )
}
