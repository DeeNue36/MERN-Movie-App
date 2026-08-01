import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Loader } from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useProfileMutation } from '../../redux/api/users'

export const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState( userInfo?.username || '');
    const [email, setEmail] = useState( userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const [updateProfile, {isLoading: loadingUpdatedProfile}] = useProfileMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated successfully');
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div>
            <div className="container mx-auto p-4 mt-40">
                <div className="flex justify-center align-center md:flex md:space-x-4">
                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Name
                                </label>
                                <input type="text" name="name" id="name" placeholder='Enter your name' className='form-input border p-4 w-full rounded-sm' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Email
                                </label>
                                <input type="text" name="email" id="email" placeholder='Enter your email' className='form-input border p-4 w-full rounded-sm' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Password
                                </label>
                                <input type="password" name="password" id="password" placeholder='Enter your password' className='form-input border p-4 w-full rounded-sm' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirm-password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Confirm Password
                                </label>
                                <input type="password" name="confirm-password" id="confirm-password" placeholder='Enter your new password' className='form-input border p-4 w-full rounded-sm' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>

                            <div className="flex justify-between">
                                <button type="submit" className="bg-teal-500 w-screen mt-8 font-bold text-white py-2 px-4 rounded hover:bg-teal-600">
                                    Update
                                </button>
                            </div>

                            {loadingUpdatedProfile && <Loader />}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}