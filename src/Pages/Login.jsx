
import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast'
import { login } from '../Redux/Slices/AuthSlice';

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [loginData, setLoginData] = useState({
        email:"",
        password: ""
    })

    function handelInputUser(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }

   
    
     async function onLogin(event) {
        event.preventDefault()

        if(!loginData.email || !loginData.password){
            toast.error("Please fill the all Details")
            return
        }

        const response = await dispatch(login(loginData))
        console.log(response)

        if(response?.payload?.success)       
            navigate("/")
        
        // dispatch create account action, considering if action goes well then navigate to home page.
       


        setLoginData({
            email:"",
            password: ""
        });

        // making action for create account which is disapatch 

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
            <form onSubmit={onLogin} noValidate className="flex flex-col justify-center m-auto gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold m-auto">Login Page</h1>
                <div className='flex flex-col gap-1 '>
                        <label htmlFor="email" className='font-semibold '>Email</label>
                        <input 
                        type="email"
                        required
                        name='email'
                        id='email'
                        placeholder="Enter your email"
                        autoComplete="username"
                        className='bg-transparent px-2 py-1 border rounded-2xl my-3'
                        value={loginData.email}
                        onChange={handelInputUser}
                        />
                </div>

                <div className='flex flex-col gap-1 '>
                <label htmlFor="password" className='font-semibold '>Password</label>
                        <input 
                        type="password"
                        required
                        name='password'
                        id='password'
                        placeholder="Enter your password"
                        className='bg-transparent px-2 py-1 border rounded-2xl my-3'
                        autoComplete="new-password"
                        value={loginData.password}
                        onChange={handelInputUser}
                        />
                </div>
                <button type="submit" className='bg-yellow-600 hover:bg-yellow-500 transition-all rounded-sm ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer'> 
                   {/* type=submit means  */}
                    Login
                </button> 
                <p className='text-center'>
                    Don't have an account ? 
                    <Link className = " text-accent cursor-pointer" to = "/signup">Signup</Link>
                </p>
            </form>
            </div>
        </HomeLayout>
    )

}
export default Login;