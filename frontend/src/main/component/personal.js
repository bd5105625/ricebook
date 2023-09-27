import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../url";
import { new_status } from "../../feature/register/registerSlice";

export const Personal = () => {
    const dispatch = useDispatch()
    const { Avatar, DisplayName, Headline } = useSelector((store) => store.register)
    const [statusText, setStatusText] = useState(Headline)
    const [editStatus, setEditStatus] = useState(false)
    const updateStatus = async () => {
        setEditStatus(!editStatus)
        let todo = {
            headline: statusText
        }
        await axios.put(`${BASE_URL}/headline`, todo)
        .then((res) => {
            // console.log("output displayname", document.cookie.split('=')[1])
            dispatch(new_status(statusText))
        })
    }
    

    return (
        <div className='mx-10 mt-10 mb-auto text_align_center bg-white col-span-2 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <div>
                <img src={Avatar} height="300" width="200"
                    className="rounded-full h-24 w-24 mx-auto mt-10"/>
                    
            </div>
            <div>
                <h1 className="text mt-2"
                    htmlFor="user_avatar">{DisplayName}</h1>
            </div>
            <div className="mt-2">
                { editStatus ?
                    <input type="text" id="status_input" className="rounded-full" onChange={(e) => setStatusText(e.target.value)} value={statusText}/>
                    :
                    <h3 className="text" id="status">{statusText}</h3>
                }
            </div>
            {/* <div className="mb-6">

                <input type="text" id="status_input" onChange={(e) => setStatusText(e.target.value)} value={statusText}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </input>
            </div> */}
            <button id="update_button" type="button" onClick={updateStatus}
                className="w-full text-black mb-6 mt-4 bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                {editStatus ? 'Save' : 'Edit Status'}
            </button>
        </div>
    )
};
export default Personal;