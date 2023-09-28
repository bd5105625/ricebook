import React from "react";
import { Label} from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { update_information, new_Avatar, Page_action} from "../../feature/register/registerSlice";
import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../../url";


export const UpdateForm = () => {

    const {Account, Avatar, DOB, DisplayName, ZipCode, Phone, Email, Password} = useSelector((state)=>state.register)
    const [formData, setFormData] = useState({
        account: Account,
        displayname: DisplayName,
        email: Email,
        zipcode: ZipCode,
        phone: Phone,
        dob: DOB,
    })
    const [password1, setPassword1] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [passwordStatus, setPasswordStatus] = useState(true)
    const dispatch = useDispatch((store) => store.register)

    const handleUploadAvatar = async () => {
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        if (imagefile.files[0] === undefined) {
            // alert("Please select a file")
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

    const handleInputChange = (event) => {
        const {id, value} = event.target
        setFormData((formData) => ({
            ...formData,
            [id]: value
            }))
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
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        if (password1 !== repeatPassword) {
            alert("Password not match")
            return 
        }
        else if (password1 !== "" && repeatPassword !== "") {
            let new_password = {
                password: password1
            }
            await axios.put(`${BASE_URL}/password`, new_password)
                .then((res) => {
                    console.log("in changed password")
                    alert("Password updated")
                })
        }
        handleUploadAvatar()
        console.log("in update information", formData)
        await axios.put(`${BASE_URL}/profile`, {...formData, user: Account})
            .then((res) => {
                console.log("in update information", formData)
                // window.localStorage.setItem("userInformation", JSON.stringify(res.data))
                dispatch(update_information(formData))
                // setFormData({
                //     account: Account,
                //     displayname: DisplayName,
                //     email: Email,
                //     zipcode: ZipCode,
                //     phone: Phone,
                //     dob: DOB,
                // })
                alert("Information updated")
            })
        
        

    }

    return (
        <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
            <form className="mt-8 space-y-6" onSubmit={handleUpdate} >
                <input 
                    className="mx-auto my-3 width:50% block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help" name="image" id="file" type="file" >
                </input>
                <div className=" rounded-md pb-1">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="account" value="Account" />
                            <input
                                className="bg-slate-300 relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                id="account"
                                value={formData.account}
                                type="text"
                                onChange={handleInputChange}
                                placeholder="Account"
                                required={true} 
                                disabled={true}
                                />
                        </div>
                        <div>
                            <Label htmlFor="displayname" value="Display Name"/>
                            <input
                                className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                id="displayname"
                                type="text"
                                value={formData.displayname}
                                onChange={handleInputChange}
                                placeholder="Display Name"
                                />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="zip" value="ZipCode"/>
                            <input
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                                id="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="77005"
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
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                                <Label htmlFor="email" value="Your email"/>
                            <input
                                className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="name@ricebook.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email2" value="Birthday"/>
                            <input
                                className="bg-slate-300 relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={formData.dob}
                                onChange={handleInputChange}
                                id="dob"
                                type="date"
                                disabled={true}
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
                            />
                            <div className="mb-2 block">
                                {
                                    passwordStatus ? <p></p> : <p className="text-red-600">Password not match</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center">

                    <button  
                                className="rounded-full mb-4 bg-gray-200 px-4 py-2 hover:bg-gray-400 focus:ring-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                disabled={!passwordStatus}
                            >
                        Update
                    </button>
                </div>
            </form>
        </div>
        </div>
    )

};
export default UpdateForm;