import React, { useEffect, useState } from "react"
import '../main.css'
import { useDispatch, useSelector } from "react-redux";
import { addPost,} from "../../feature/post/postSlice";
import axios from "axios";
import { BASE_URL } from "../../url";

export const PostField = ({handleSetSearchPost, getPost}) => {

    const {DisplayName} = useSelector((store) => store.register)
    const dispatch = useDispatch()
    const [imgSrc, setImgSrc] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
    const [message, setMessage] = useState('')

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            setImgSrc(URL.createObjectURL(event.target.files[0]))

            // not sure do i need this line
            // preview.style.display = "block"; 
        }
    }

    const PostArticle= async () => {

        if (message !== "")
        {
            let todo = {author: DisplayName, text:message, url:imgSrc}
            if (imgSrc === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
            {
                todo = {author :DisplayName, text:message, url:''}
            }
            else {
                var formData = new FormData()
                var imageFile = document.querySelector('#file')
                formData.append("image", imageFile.files[0])
                await axios.post(`${BASE_URL}/avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    todo.url = res.data.url_image
                })                
            }


            
            await axios.post(`${BASE_URL}/article`, todo)
            .then((res) => {
                let newPost = {
                    userId: 0,
                    id: new Date().getTime().toString(),
                    title: "",
                    body: todo.text ,
                    img: todo.url,
                    name: DisplayName,
                    isComment: false
                    // date: new Date()
                }
                dispatch(addPost({newPost}))
                setMessage('')
                setImgSrc('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
                getPost()
                alert("Post Success")
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            alert('Please enter some words')
        }
    }

    const clear_post = () => {
        setMessage('')
        setImgSrc('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
    }

    return (
        <div>
            <div className="mx-2 my-4 px-2">
                <textarea id="message" rows="6" value={message} onChange={(e) => setMessage(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write something here">
                </textarea>
            </div>
            <div className="grid grid-cols-8 w-full flex">
                {/* <div className="col-span-2">
                    <img id="preview" className="text_align_center preview_img mx-auto my-4 rounded-lg border border-gray-300" 
                        src={imgSrc} height="300" width="200">    
                    </img> */}

                {/* </div> */}

                <div className="col-span-4 ml-2">
                    <input
                        className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help" id="file" type="file"
                        onChange={(event)=>handleFileUpload(event)}
                        >
                    </input>
                </div>
                <div className="col-span-2">
                    <button id="post_text" type="button" onClick={clear_post}
                            className="w-full text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Cancel
                    </button>
                </div>
                <div className="col-span-2 px-2">
                    <button type="button" onClick={() => PostArticle()}
                            className="w-full text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Post
                    </button>
                </div>
                


                </div>
                <div className="search_style">
                <input type="text" id="search_input" onChange={handleSetSearchPost} placeholder="Search Name or Content"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </input>
            </div>
        </div>
    )
}

export default PostField;