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


export const RegistrationForm = ({setIsLoading, setStatus}) =>  {

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
                                {/* <div className="mb-2 block"> */}
                                    <Label htmlFor="email" value="Your email"/>
                                {/* </div> */}
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
                                    className="rounded-full bg-gray-400 px-4 py-2 hover:bg-gray-400 focus:ring-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
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
export default RegistrationForm