import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useLoginMutation } from '../../redux/api/users';
import { toast } from 'react-toastify';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [login, {isLoading}] = useLoginMutation();
    
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
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
            toast.success('User logged in successfully');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div>
            <section className="pl-40 flex flex-wrap">
                <div className="mr-16 mt-20">
                    <h1 className="text-2xl font-semibold mb-4">
                        Sign In / Login
                    </h1>
                    
                    <form onSubmit={submitHandler} className="container w-160">
                        <div className="my-8">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email Address
                            </label>
                            <input type="email" name="email" id="email" className='mt-1 p-2 border rounded w-full' placeholder='Enter Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="my-8">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input type="password" name="password" id="password" className='mt-1 p-2 border rounded w-full' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <button disabled={isLoading} type='submit' className='bg-teal-500 text-white px-4 py-2 rounded my-4'>
                            {isLoading ? 'Logging You In...' : 'Login'}
                        </button>
                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className='text-white'>
                            Don't have an account? {' '} 
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-teal-500 hover:underline'>Register</Link>
                        </p>
                    </div>
                </div>

                <img src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-260 w-[50%] xl:block md:hidden sm:hidden rounded-lg" />

            </section>
        </div>
    )
}
