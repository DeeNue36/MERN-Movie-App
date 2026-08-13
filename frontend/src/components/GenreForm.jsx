

export const GenreForm = ({value, setValue, handleSubmit, buttonText = 'Submit', handleDelete}) => {
    return (
        <div className='p-3'>
            <form onSubmit={handleSubmit} className='space-y-3'>
                {/* Genre Input Field */}
                <input type="text" name="genre-name" id="genre-name" 
                    className='py-3 px-4 border border-teal-500 rounded-lg w-240 text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50' 
                    placeholder='Enter Genre Name' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                />
                
                <div className="flex justify-between">
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className='bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50'
                    >
                        {buttonText}
                    </button>
                    
                    {/* Delete Button */}
                    {handleDelete && (
                        <button 
                            type="button"
                            onClick={handleDelete} 
                            className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50'
                        >
                            Delete
                        </button>
                    )}
                </div>


            </form>
        </div>
    )
}
