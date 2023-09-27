import React from "react";
import { Label} from "flowbite-react";
import { useNavigate } from "react-router-dom";

// import {UserList, UserNameList} from '../main/follower'
import { useDispatch } from "react-redux";
import { update_information,Page_action, LOGIN, LOGIN_ERROR, REGISTER, REGISTER_ERROR } from "../../feature/register/registerSlice";
import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../../url";
import '../register.css'
import {information} from "../newuser";


export const LoginForm = ({setIsLoading, setStatus}) => {

    const [formData, setFormData] = useState({
        account: '',
        password: '',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const updateUserInformation =  async () => {
        await axios.get(`${BASE_URL}/profile`)
            .then(res => {                
                console.log("data from backend", res.data)
                window.localStorage.setItem("userInformation", JSON.stringify(res.data))
                document.cookie = "displayname=" + res.data.displayname
                // console.log("displayname from local storage", JSON.parse(window.localStorage.getItem("userInformation")).displayname)
            
                dispatch(update_information(res.data))
            })
            .catch(error => {
                if (error.response) {
                    //get HTTP error code
                    console.log(error.response.status)
                } else {
                    console.log(error.message)
                }
            })
        dispatch(Page_action({type:"LOGIN"}))
    }

    const clickLogin = async (e) =>{
        setIsLoading(true)
        //delay 3 second
        // sleep(3000)
        e.preventDefault()
        const todo = {
            'username': formData.account,
            'password': formData.password
        }
        information.Account = formData.account
        information.Password = formData.password
        try {

            const res = await axios.post(`${BASE_URL}/login`, todo)  
            if (res.data.result === "login success"){
                // store username to cookie
                await updateUserInformation()
                dispatch(Page_action({type: LOGIN}))
                navigate('/main')
                return true
            }
            
        } catch (error) {
            window.alert("Wrong Account or password")
            setIsLoading(false)
            dispatch(Page_action({type: LOGIN_ERROR}))
            return false
        }
    }

    const handleClickGoogle = async () => {
        await axios.get(`${BASE_URL}/auth/google`)
            .then(res => {
                console.log(res)
            })

    }

    return (
        // <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">
        <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in</h3>
                    {/* <p className="mt-2 text-center text-sm text-gray-600">
                        Not yet an user?
                        <a onClick={} href="/" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign up </a>
                    </p> */}
                </div>

                <form className="flex flex-col gap-4" method="POST" onSubmit={(event)=>{clickLogin(event)}}>
                    <div className="-space-y-px rounded-md  pb-1">
                        <span className="mt-2 text-center text-sm "> Username </span>
                        <input
                            className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            id="account1"
                            value={formData.account}
                            onChange={(event) => setFormData({...formData, account: event.target.value})}
                            type="text"
                            required={true}
                            // pattern="/^[A-Za-z0-9]{0,}/i"
                        />
                    </div>
                    <div className="-space-y-px rounded-md pb-1">
                        <span className="mt-2 text-center text-sm "> Password </span>
                        <input
                            className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            id="password1"
                            value={formData.password}
                            onChange={(event) => setFormData({...formData, password: event.target.value})}
                            type="password"
                            required={true}
                            />
                    </div>
                    <div className="flex flex-col justify-center">
                        {/*<Link to={'/main'}>*/}
                            <button type="submit"
                                    // className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    className="rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400 focus:ring-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Login
                            </button>
                        {/*</Link>*/}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm;