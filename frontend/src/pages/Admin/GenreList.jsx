import { useState } from "react"
import { 
    useCreateGenreMutation, 
    useUpdateGenreMutation, 
    useDeleteGenreMutation, 
    useFetchGenresQuery } 
from "../../redux/api/genre";
import { toast } from "react-toastify";
import { GenreForm } from "../../components/GenreForm";
import { Modal } from "../../components/Modal";

export const GenreList = () => {
    const { data: genres, refetch } = useFetchGenresQuery();
    const [genreName, setGenreName] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatedGenre, setUpdatedGenre] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();

    const handleCreateGenre = async (e) => {
        e.preventDefault();

        if (!genreName) {
            toast.error('Genre name is required');
            return;
        }

        try {
            const newGenre = await createGenre({name: genreName}).unwrap();
            // const newGenre = await createGenre({name}).unwrap();
            if (newGenre.error) {
                toast.error(newGenre.error);
            }
            else {
                setGenreName("");
                toast.success(`${newGenre.name} genre created successfully`);
                refetch();
            }

        } catch (error) {
            console.error(error);
            toast.error('Genre creation failed, please try again');
        }
    }

    return (
        <div className="ml-40 flex flex-col md:flex-row">
            <div className="md:w-3/4 p-3">
                <h1 className="h-12">Manage Genres</h1>
                <GenreForm value={genreName} setValue={setGenreName} 
                    handleSubmit={handleCreateGenre}
                />

                <br/>

                <div className="flex flex-wrap">
                    {genres?.map((genre) => (
                        <div key={genre._id} className="p-2">
                            <button 
                                type="button" 
                                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50" 
                                onClick={() => {
                                    setModalVisible(true);
                                    setSelectedGenre(genre);
                                    setUpdatedGenre(genre.name);
                                }}
                            >
                                {genre.name}
                            </button>
                        </div>
                    ))}
                </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <GenreForm 
                        value={updatedGenre} 
                        buttonText="Update"
                        setValue={(value) => setUpdatedGenre(value)} 
                        // handleSubmit={handleUpdateGenre}
                        selectedGenre={selectedGenre}
                        // handleDelete={handleDeleteGenre}
                    />
                </Modal>

            </div>
        </div>
    )
}
