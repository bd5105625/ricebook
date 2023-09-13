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

const MainPage = () => {
    const [status,setStatus] = useState(true);
    const handleButton = () => {
        setStatus(!status)

    }

    return (

        <div className="">
        {/* <div className=" px-2 sm:px-4 py-3 "> */}
        <div className="">
         {/* <nav className="fixed bg-gray-500 w-full px-14 p-3"> */}
            <nav className="py-4 container flex flex-wrap justify-between items-center mx-auto">
                {/*<a href="https://flowbite.com/" className="flex items-center">*/}
                <a className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RiceBook</span>
                </a>
                {/* <label data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            ></path>
                    </svg>
                </label> */}
                <div>
                    <button 
                        onClick={handleButton}
                        className="rounded-full bg-gray-400 px-4 py-1">
                        {status ? "Register" : "Sign in"}
                    </button>
                </div>

            </nav>
            
            {/*<div class="text-center">*/}
            {/* <div className="float-landing-container  w-9/12 m-15 rounded-lg"> */}
            {/* <div className="container w-9/12 mx-auto rounded-xl shadow border p-8 m-10 bg-white"> */}
            <div className="float-landing-container container w-1/2 mx-auto rounded-xl   p-8 m-10 bg-white">

                { status ? 

                        // <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">
                            <LoginForm />
                        
                        // </div>
                        
                    
                    : 
                    // <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">
                        <RegistrationForm />
                    // </div>
                }


                    {/* <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">
                        <RegisterForm />
                     </div> */}
                    {/*{this.state.show_login?*/}


                {/* Sign Up Form*/}
                {/* <div className="flex flex-col items-center justify-center">


                    <RegistrationForm/>
                </div> */}
            </div>
            
            {/* <form > */}

                {/* <button onClick={handleButton} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Next Page
                </button>
                <label>{data}</label> */}
            {/* </form> */}
            {/* <GetAllData /> */}

        </div>
        </div>


    )
}
const LoginForm = () => {

    const [formData, setFormData] = useState({
        account: '',
        password: '',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch()


    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     let pass = clickLogin()

    //     console.log(pass)
    //     if (pass){
    //         dispatch(Page_action({type: LOGIN}))
    //         navigate('/main')
    //     }
    //     else{
    //         dispatch(Page_action({type: LOGIN_ERROR}))
    //     }
    // }

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
                    console.log("here")
                    dispatch(Page_action({type: LOGIN}))
                    navigate('/main')
                    // console.log("cookie",res.cookie())
                    return true
                }
            })
            .catch(error => {
                window.alert("Wrong Account or password")
                dispatch(Page_action({type: LOGIN_ERROR}))
                return false
                // if (error.response) {
                //     //get HTTP error code
                //     console.log(error.response.status)
                // } else {
                //     console.log(error.message)
                // }
            })

        // original code



        // if (UserNameList.includes(Account)) {
        //     let index = UserNameList.findIndex((name) => name === Account)
        //     if (Password === UserPasswordList[index]){
        //         console.log(UserInformation[index])
        //         updateUserInformation(UserInformation[index])
        //         return true
        //     }
        // }
        // window.alert("Wrong Account or password")
        // // dispatch(new_state({state}))
        // return false
    }

    const handleClickGoogle = async () => {
        await axios.get(`${BASE_URL}/auth/google`)
            .then(res => {
                console.log(res)
            })

    }

    return (
        <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">

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
                        value={formData.account}
                        onChange={(event) => setFormData({...formData, account: event.target.value})}
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

    const [formData, setFormData] = useState({
        account: '',
        displayName: '',
        email: '',
        password: '',
        repeatPassword: '',
        zip: '',
        phone: '',
        dob: '',
    })

    const [passwordStatus, setPasswordStatus] = useState(true)

    const dispatch = useDispatch((store) => store.register)

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {id, value} = event.target
        setFormData({...formData, [id]: value})
        if (formData.password !== formData.repeatPassword){
            setPasswordStatus(false)
        }
        else{
            setPasswordStatus(true)
        }

    }
    

    const handSignUp = async () => {

        
        const information = {
            username:formData.account,
            password:formData.password,
            displayname: formData.displayName,
            zipcode: formData.zip,
            // address:{street:passwordInput.value, zipcode:zipInput.value},
            phone: formData.phone,
            email:formData.email,
            dob:formData.dob,
        }
        await axios.post(`${BASE_URL}/register`, information)
        .then(res => {
            // console.log("data here",res.data)
            dispatch(update_information({information}))
            dispatch(Page_action({type: REGISTER}))
            navigate('/main')
            // console.log(res.data)
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
        <div className="bg-white flex mx-auto space-x-5 px-16 pt-20">

        <div className="flex flex-col items-center justify-center">
            <form className="flex flex-col gap-2" onSubmit={handSignUp}>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="account"
                            value="Account"
                        />
                    </div>
                    <TextInput
                        id="account"
                        value={formData.account}
                        onChange={handleInputChange}
                        placeholder="Account"
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
                        value={formData.displayName}
                        onChange={handleInputChange}
                        placeholder="Display Name"
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
                        value={formData.zip}
                        onChange={handleInputChange}
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
                        value={formData.phone}
                        onChange={handleInputChange}
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
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="name@ricebook.com"
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
                        value={formData.dob}
                        onChange={handleInputChange}
                        id="birthday"
                        type="date"
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
                        value={formData.password}
                        onChange={handleInputChange}
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
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                        type="password"
                        required={true}
                    />
                    <div className="mb-2 block">
                        {
                            passwordStatus ? <p></p> : <p>Password not match</p>
                        }
                    </div>
                </div>

                <div className="flex flex-col justify-center">

                    <button  type="submit"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            disabled={!passwordStatus}
                        Sign Up
                    </button>
                </div>
            </form>


        </div>
        </div>
    );
};


export default MainPage;