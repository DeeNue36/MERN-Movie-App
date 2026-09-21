import { Link } from 'react-router-dom'
import { useGetAllMoviesQuery } from '../../redux/api/movies'

export const AdminMoviesList = () => {

    const { data: movies } = useGetAllMoviesQuery();


    return (
        <div className='container mx-36'>
            <div className="flex flex-col md:flex-row">
                <div className="p-3">
                    <div className="ml-4 text-xl font-bold h-12">
                        All Movies ({movies?.length})
                    </div>

                    <div className='flex flex-wrap justify-around items-center p-8'>
                        {movies?.map((movie) => (
                            <Link key={movie._id} to={`/admin/movies/update/${movie._id}`} className='block mb-4 overflow-hidden'>
                                <div className="flex">
                                    <div key={movie._id} classNme='max-w-sm m-8 rounded overflow-hidden shadow-lg'>
                                        <img src={movie.image} alt={movie.name} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
