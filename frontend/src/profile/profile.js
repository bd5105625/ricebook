import React from "react"
import {Link} from "react-router-dom";
import './profile.css'
import { useSelector, useDispatch } from "react-redux";
import { new_Avatar, update_information } from "../feature/register/registerSlice";
import axios from "axios";
import { Logout_clear, Page_action } from "../feature/register/registerSlice";
import { updatePost, update} from "../feature/post/postSlice";
import { BASE_URL } from "../url";
import { UpdateForm } from "./component/updateForm";


const Profile = () => {
    const original = useSelector((state)=>state.register)
    const {Account, Avatar} = useSelector((state)=>state.register)
    const dispatch = useDispatch()

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
                            </div>
                        </div>
                        < UpdateForm />
                    </div>
                </div>
                <div className="span-col-2"></div>
            </div>
        </div>

    );
};

export default Profile;