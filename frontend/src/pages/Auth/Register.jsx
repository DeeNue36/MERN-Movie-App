import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useRegisterMutation } from '../../redux/api/users';
import { toast } from 'react-toastify';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [register, {isLoading}] = useRegisterMutation();
    
    const {userInfo} = useSelector((state) => state.auth)
    
    const {search} = useLocation();
    const searchParam = new URLSearchParams(search);
    const redirect = searchParam.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({username, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
                toast.success('User registered successfully');
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err.error);
            }
        }
    }


    return (
        <div className='pl-40 flex flex-wrap'>
            <div className="mr-16 mt-20">
                <h1 className="text-2xl font-semibold mb-4">
                    Register
                </h1>
                <form onSubmit={submitHandler} className='container w-160'>
                    <div className="my-8">
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input type='text' id='name' className='mt-4 p-2 border rounded w-full' placeholder='Enter Name' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='on' required />
                    </div>

                    <div className="my-8">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email Address
                        </label>
                        <input type='text' id='email' className='mt-4 p-2 border rounded w-full' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='on' required />
                    </div>

                    <div className="my-8">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input type='password' id='password' className='mt-4 p-2 border rounded w-full' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' required />
                    </div>

                    <div className="my-8">
                        <label htmlFor="confirm-password" className="block text-sm font-medium">
                            Confirm Password
                        </label>
                        <input type='password' id='confirm-password' className='mt-4 p-2 border rounded w-full' placeholder='Retype Your Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete='off' required />
                    </div>

                    <button disabled={isLoading} type='submit' className='bg-teal-500 text-white px-4 py-2 rounded my-4'>
                        {isLoading ? 'Registering User...' : 'Register'}
                    </button>
                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p className="text-white">
                        Already have an account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-teal-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
            
            <img 
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="" 
                className="h-260 w-[50%] xl:block md:hidden sm:hidden rounded-lg"
            />
            
        </div>
    )
}
