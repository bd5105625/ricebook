import React from "react"
import {Link} from "react-router-dom";
import './profile.css'
import { useSelector, useDispatch } from "react-redux";
import { new_Avatar, update_information } from "../feature/register/registerSlice";
import axios from "axios";
import { Logout_clear, new_status, Page_action, load_data } from "../feature/register/registerSlice";
import { addPost, updatePost, update} from "../feature/post/postSlice";
import { BASE_URL } from "../url";
import { TestForm, UpdateForm } from "./component/updateForm";


const Profile = () => {
    const original = useSelector((state)=>state.register)
    const {Account, Avatar} = useSelector((state)=>state.register)
    const dispatch = useDispatch()

    const UpdateInformation = async (event) => {
        
        event.preventDefault()
        const update_phone = document.getElementById('Phone_update')
        const update_email = document.getElementById('Email_update')
        const update_zip = document.getElementById('Zip_update')
        const pass1 = document.getElementById('Password_1')
        const pass2 = document.getElementById('Password_2')
        if (pass1.value !== pass2.value) {
            alert("Password not match")
            return
        }
        else if (pass1.value !== "" && pass2.value !== "") {
            let new_password = {
                password: pass1.value
            }
            await axios.put(`${BASE_URL}/password`, new_password)
                .then((res) => {
                    // alert("Password updated")
                })
        }
        let new_information = {
            ...original,
            displayname: original.DisplayName,
            phone: update_phone.value || original.Phone,
            email: update_email.value || original.Email,
            zipcode: update_zip.value || original.ZipCode,
        }
        await axios.put(`${BASE_URL}/profile`, {...new_information, user: Account})
            .then((res) => {
                console.log("in update information", new_information)
                // window.localStorage.setItem("userInformation", JSON.stringify(res.data))
                dispatch(update_information(new_information))
                document.getElementById('update_Form').reset()
                // alert("Information updated")
                alert("Information updated")
            })
    }

    const handleUpload = async () => {
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        if (imagefile.files[0] === undefined) {
            alert("Please select a file")
            return
        }
        formData.append("image", imagefile.files[0]);
        await axios.post(`${BASE_URL}/avatar`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }

        })
        .then((res) => {
            alert("Avatar updated")
            let url = res.data.url_image
            dispatch(new_Avatar(url))
            //update avatar in local storage
            let temp = JSON.parse(window.localStorage.getItem("userInformation"))
            temp.avatar = url
            window.localStorage.setItem("userInformation", JSON.stringify(temp))
            // window.localStorage.setItem()
            axios.put(`${BASE_URL}/avatar`, {user:Account ,avatar: url})
                .then((res) => {
                    console.log("Avatar updated", res.data)
            })

        })

    }
    const handleLogout = async () => {
        let addinglist = []
        let newPost = []
        await axios.put(`${BASE_URL}/logout`)
        .then((res) => {
            // console.log(res)
            dispatch(Logout_clear())
            dispatch(Page_action({Page_State:'LOGOUT'}))
            dispatch(update({addinglist}))
            dispatch(updatePost({newPost}))
            // clear cookie
            let removing = document.cookie.split(';')
            for (let i = 0;i < removing.length;i++){
                let name = removing[i].split('=')[0]
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            }
            localStorage.clear()
            if (!localStorage.getItem('userInformation')) {
                let data = {
                    username: '',
                    displayname: '',
                    zipcode: '',
                    phone: '',
                    email: '',
                    headline: '',
                    dob: '',
                    avatar: '',
                    following: [],
                }
                window.localStorage.setItem("userInformation", JSON.stringify(data))
            }
        })
    }
    return (
        <div >
            <nav className="py-4 flex flex-wrap justify-between items-center mx-auto bg-gray-400">
                <h3 className="flex items-center ml-10">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RiceBook</span>
                </h3>
                <div>
                    <Link to={'/'} >
                        <button type="button" onClick={handleLogout}
                            className="rounded-full bg-gray-400 px-4 py-1 mr-10 bg-white text-black">
                                {"Log out"}
                        </button>
                    </Link>
                    <Link to={'/main'}>
                        <button
                            className="rounded-full bg-gray-400 px-4 py-1 mr-10 bg-white text-black">
                                {"Main Page"}
                        </button>
                    </Link>
                </div>
            </nav>
            <div className="grid grid-cols-8 gap-6 mx-10">
                <div className="col-span-2"></div>
                <div className="col-span-4 mt-10">

                    <div className='bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700'>
                        <div>
                            <div className={'text-center'}>
                                <img id="avatar" src={Avatar} height="300" width="200" alt=""
                                    className="rounded-full h-48 w-48 mx-auto mt-10"/>
                                
                                {/* <button onClick={handleUpload}
                                    className="w-50 text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 rounded-full button">
                                    Upload Avatar
                                </button> */}
                                
                            </div>
                        </div>
                        {/* < TestForm /> */}
                        < UpdateForm />
                        {/*
                        <form>
                            <div className="text_align_center">
                                <div>
                                    <h2 className={'text-center'}>

                                        <CreateInformation />
                                    </h2>
                                </div>
                            </div>
                        </form>

                            */}

                    </div>
                    {/* <div className='text_align_center bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700'>
                        <form id="update_Form" onSubmit={UpdateInformation}>
                                <div>
                                    <h5 className='text-center'>Update Your Information</h5>
                                </div>
                            <div className="grid gap-6 mb-6 md:grid-cols-1">
                                <div>
                                    <label htmlFor="Zip_update"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Zipcode
                                    </label>
                                    <input type="tel" id="Zip_update"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        pattern="[0-9]{5}" placeholder="77005" ></input>
                                </div>
                                <div>
                                    <label htmlFor="Phone_update"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Phone
                                    </label>
                                    <input type="tel" id="Phone_update"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" ></input>
                                </div>
                                <div>
                                    <label htmlFor="Email_update"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input type="email" id="Email_update"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="abc@gmail.com" ></input>
                                </div>
                                <div>
                                    <label htmlFor="Password_update"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Password
                                    </label>
                                    <input type="password" id="Password_1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        ></input>
                                </div>
                                <div>
                                    <label htmlFor="Password_2"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Repeat Password
                                    </label>
                                    <input type="password" id="Password_2"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        ></input>
                                </div>

                            </div>

                            <button type={"submit"}
                                className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 rounded-full button">
                                Update
                            </button>
                        </form>
                    </div> */}
                </div>
                <div className="span-col-2"></div>
            </div>
        </div>

    );
};



const CreateInformation = () => {
    const { ZipCode, Phone, Email} = useSelector((state)=>state.register)
    return (
        <div className="">

            <h4>Your Information</h4>
            <div>

                <h4 id="zip_info">ZipCode: {ZipCode}</h4>
                <h4 id="phone_info">Phone: {Phone}</h4>
                <h4 id="email_info">Email: {Email}</h4>
            </div>
        </div>
    )
}
export default Profile;