import React from "react";
import {Checkbox, Label, TextInput} from "flowbite-react";
import { useNavigate } from "react-router-dom";

import {information} from "./newuser";
import {UserList, UserNameList} from '../main/getdata'
import { useDispatch } from "react-redux";
import { update_information,Page_action, LOGIN, LOGIN_ERROR, REGISTER, REGISTER_ERROR } from "../feature/register/registerSlice";
import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../url";

const MainPage = () =>{
    const [status,setStatus] = useState(true);


    return (

        <div className="">
            <div className="">
            {/* <nav className="fixed bg-gray-500 w-full px-14 p-3"> */}
                <nav className="py-4 container flex flex-wrap justify-between items-center mx-auto">
                    {/*<a href="https://flowbite.com/" className="flex items-center">*/}
                    <a className="flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RiceBook</span>
                    </a>
                    <div>
                        <button 
                            onClick={()=>{setStatus(!status)}}
                            className="rounded-full bg-gray-400 px-4 py-1">
                            {status ? "Register" : "Sign in"}
                        </button>
                    </div>

                </nav>
                
                <div className="float-landing-container container w-1/2 mx-auto rounded-xl   p-8 m-10 bg-white">
                    { status ? 
                        <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">
                            <LoginForm />
                        </div>
                        : 
                        <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">
                            <RegistrationForm />
                        </div>
                    }
                </div>
            </div>
        </div>


    )
}
const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()


    const updateUserInformation =  async () => {
        await axios.get(`${BASE_URL}/profile`)
            .then(res => {                
                console.log("data from backend", res.data)
                window.localStorage.setItem("userInformation", JSON.stringify(res.data))
                document.cookie = "displayname=" + res.data.displayname
            
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
        e.preventDefault()
        
        let Account = document.getElementById('account1').value
        let Password = document.getElementById("password1").value
        const todo = {
            'username': Account,
            'password': Password
        }
        information.Account = Account
        information.Password = Password
        // await axios.post('http://localhost:3000/login', todo,  { credentials: true })
        await axios.post(`${BASE_URL}/login`, todo)  
            .then(res => {

                if (res.data.result === "login success"){
                    // store username to cookie
                    
                    updateUserInformation()
                    console.log("here")
                    dispatch(Page_action({type: LOGIN}))
                    navigate('/main')
                    return true
                }
            })
            .catch(error => {
                window.alert("Wrong Account or password")
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
        <div>

        <form className="flex flex-col gap-4" onSubmit={(event)=>{clickLogin(event)}}>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="account1"
                        value="Your account name"
                        />
                </div>
                <TextInput
                    id="account1"
                    type="text"
                    placeholder="TomCruise"
                    required={true}
                    
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="password1"
                        value="Your password"
                        />
                </div>
                <TextInput
                    id="password1"
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
            {/* <div className="inline-flex justify-center items-center w-full py-4">
                <hr className="my-8 w-full h-px bg-gray-800 border-0 dark:bg-gray-800 "/>
                <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">Or continue with</span>
            </div>
            <button onClick={handleClickGoogle}
                className="rounded-full bg-blue-600 px-4 py-1 justify-center items-center w-full text-white">
                    Google
            </button> */}
        </div>
    )
}



const RegistrationForm = () =>  {

    const dispatch = useDispatch((store) => store.register)

    const navigate = useNavigate()
    
    const [user_info, setUser_info] = useState({username: "", password: "", displayname: "", zipcode: "", phone: "", email: "", dob: ""})



    const clickSignup = async () => {
        
        const accountInput = document.getElementById('account')
        if (UserNameList.includes(accountInput.value)){
            return false
        }
        const displayNameInput = document.getElementById('displayName')
        const phoneInput = document.getElementById('phone')
        const emailInput = document.getElementById('email2')
        const zipInput = document.getElementById('zip')
        const dob = document.getElementById('birthday')
        const passwordInput = document.getElementById("password2")
        const information = {
            username:accountInput.value,
            password:passwordInput.value,
            displayname: displayNameInput.value,
            zipcode: zipInput.value,
            phone: phoneInput.value,
            email:emailInput.value,
            dob:dob.value,
        }
        await axios.post(`${BASE_URL}/register`, information)
        .then(res => {
            console.log("data here",res.data)
            dispatch(update_information({information}))
            dispatch(Page_action({type: REGISTER}))
            navigate('/main')
            console.log(res.data)
            return true
        })
        .catch(error => {
                //get HTTP error code
            window.alert("Account Exists")
            dispatch(Page_action({type: REGISTER_ERROR}))
            console.log(error.response.status)
            return false
            
        })
        alert("Account Created")
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="flex flex-col gap-2" onSubmit={clickSignup}>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="account"
                            value="Account"
                        />
                    </div>
                    <TextInput
                        id="account"
                        required={true}

                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="displayname"
                            value="Display Name"
                        />
                    </div>
                    <TextInput
                        id="displayName"
                        required={true}

                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="zip"
                            value="Zipcode"
                        />
                    </div>
                    <TextInput
                        id="zip"
                        placeholder="77005"
                        required={true}
                        pattern="[0-9]{5}"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="Phone"
                            value="Phone Number"
                        />
                    </div>
                    <TextInput
                        id="phone"
                        placeholder="123-456-7890"
                        required={true}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email2"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        id="email2"
                        type="email"
                        placeholder="name@flowbite.com"
                        required={true}

                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email2"
                            value="Birthday"
                        />
                    </div>
                    <TextInput
                        aria-label="Birthday"
                        id="birthday"
                        type="date"
                        // placeholder="name@flowbite.com"
                        required={true}

                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password2"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        id="password2"
                        type="password"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="repeat-password"
                            value="Repeat password"
                        />
                    </div>
                    <TextInput
                        id="repeat-password"
                        type="password"
                        required={true}
                    />
                </div>

                <div className="flex flex-col justify-center">

                    <button  type="submit"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">

                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};


export default MainPage;