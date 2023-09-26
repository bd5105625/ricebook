import React from "react";
import { Label} from "flowbite-react";
import { useNavigate } from "react-router-dom";

import {information} from "./newuser";
// import {UserList, UserNameList} from '../main/follower'
import { useDispatch } from "react-redux";
import { update_information,Page_action, LOGIN, LOGIN_ERROR, REGISTER, REGISTER_ERROR } from "../feature/register/registerSlice";
import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../url";
import './register.css'

const MainPage = () => {
    const [status,setStatus] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const handleButton = () => {
        setStatus(!status)

    }

    return (
        
        <>
        
        <div className="">
            
            <div className="">
                <nav className="py-4 container flex flex-wrap justify-between items-center mx-auto">
                    <a className="flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RiceBook</span>
                    </a>
                    <div>
                        <button 
                            onClick={handleButton}
                            className="rounded-full bg-gray-400 px-4 py-1">
                            {status ? "Register" : "Sign in"}
                        </button>
                    </div>

                </nav>
                <div className="float-landing-container container w-1/2 mx-auto rounded-xl  p-8 m-10 bg-white">
                    { status ? 
                        (isLoading ? <LoadingPage /> : <LoginForm setIsLoading={setIsLoading} setStatus={handleButton}/>)
                        :                         
                        (isLoading ? <LoadingPage /> : <RegistrationForm setIsLoading={setIsLoading} setStatus={handleButton}/>)
                    }
                </div>

            </div>
        </div>
        </>


    )
}
const LoginForm = ({setIsLoading, setStatus}) => {

    const [formData, setFormData] = useState({
        account: '',
        password: '',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch()



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
        // await axios.post('http://localhost:3000/login', todo,  { credentials: true })
        await axios.post(`${BASE_URL}/login`, todo)  
            .then(res => {

                if (res.data.result === "login success"){
                    // store username to cookie
                    updateUserInformation()
                    dispatch(Page_action({type: LOGIN}))
                    navigate('/main')
                    return true
                }
            })
            .catch(error => {
                window.alert("Wrong Account or password")
                setIsLoading(false)
                dispatch(Page_action({type: LOGIN_ERROR}))
                return false

            })


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
                                    className="rounded-full bg-gray-400 px-4 py-2 hover:bg-gray-600 focus:ring-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Login
                            </button>
                        {/*</Link>*/}
                    </div>
                </form>
            </div>
        </div>
    )
}



const RegistrationForm = ({setIsLoading, setStatus}) =>  {

    const [formData, setFormData] = useState({
        account: '',
        displayName: '',
        email: '',
        zip: '',
        phone: '',
        dob: '',
    })

    const [password1, setPassword1] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [passwordStatus, setPasswordStatus] = useState(true)

    const dispatch = useDispatch((store) => store.register)

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {id, value} = event.target
        setFormData((formData) => ({
            ...formData,
            [id]: value
            }))
        console.log(formData)


    }

    const handlePasswordChange = (event) => {
        const value = event.target.value
        setPassword1(value)
        checkTwoPassword(value, repeatPassword)
    }

    const handleRepeatPasswordChange = (event) => {
        const value = event.target.value
        setRepeatPassword(value)
        checkTwoPassword(password1, value)
    }

    const checkTwoPassword = (pass, repeatPass) => {
        if (pass !== repeatPass){
            setPasswordStatus(false)
            setPasswordStatus(false)
        }
        else{
            setPasswordStatus(true)
            setPasswordStatus(true)
        }
    }
    

    const handSignUp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        
        const information = {
            username:formData.account,
            password:password1,
            displayname: formData.displayName,
            zipcode: formData.zip,
            phone: formData.phone,
            email:formData.email,
            dob:formData.dob,
        }
        await axios.post(`${BASE_URL}/register`, information)
        .then(res => {
            dispatch(update_information({information}))
            dispatch(Page_action({type: REGISTER}))
            alert("Account Created")
            setStatus()
            setIsLoading(false)
            navigate('/')
            return true
        })
        .catch(error => {
                //get HTTP error code
            window.alert("Account Exists")
            setIsLoading(false)
            dispatch(Page_action({type: REGISTER_ERROR}))
            // navigate('/')
            return false
            
        })
        
    }

    return (
        <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h3>
                    {/* <p className="mt-2 text-center text-sm text-gray-600">
                        Not yet an user?
                        <a onClick={} href="/" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign up </a>
                    </p> */}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handSignUp}>
                    <div className=" rounded-md pb-1">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="account" value="Account" />
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    id="account"
                                    value={formData.account}
                                    type="text"
                                    onChange={handleInputChange}
                                    placeholder="Account"
                                    required={true} />
                            </div>
                            <div>
                                <Label htmlFor="displayname" value="Display Name"/>
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    id="displayName"
                                    type="text"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    placeholder="Display Name"
                                    required={true}
                                    />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="zip" value="ZipCode"/>
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"                                    id="zip"
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="77005"
                                    required={true}
                                    pattern="[0-9]{5}"
                                />
                            </div>
                            <div>
                                <Label htmlFor="Phone" value="Phone Number" />
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    id="phone"
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="123-456-7890"
                                    required={true}
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email"/>
                                </div>
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="name@ricebook.com"
                                    required={true}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email2" value="Birthday"/>
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    id="dob"
                                    type="date"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">

                            <div>
                                <Label htmlFor="password2" value="Your password"/>
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    id="password1"
                                    value={password1}
                                    onChange={handlePasswordChange}
                                    type="password"
                                    required={true}
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="repeat-password" value="Repeat password"/>
                                <input
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    id="repeatPassword"
                                    value={repeatPassword}
                                    onChange={handleRepeatPasswordChange}
                                    type="password"
                                    required={true}
                                />
                                <div className="mb-2 block">
                                    {
                                        passwordStatus ? <p></p> : <p class="text-red-600">Password not match</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">

                        <button  type="submit"
                                    className="rounded-full bg-gray-400 px-4 py-2 hover:bg-gray-600 focus:ring-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    disabled={!passwordStatus}
                                >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LoadingPage = () => {
    return (
        <div className="loading-container">
            <div className="loader"></div>
        </div>
    )
}
export default MainPage;