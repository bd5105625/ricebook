import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom";
import './main.css'
import {ReadUser, UserNameList, UserPostList} from './getdata'
import {information} from "../landing/newuser";
import { PaginatedItems} from './post'
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost, update, handleSearch, handlerSearchCancel  } from "../feature/post/postSlice";
import { Logout_clear, new_status, Page_action, load_data } from "../feature/register/registerSlice";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { BASE_URL } from "../url";



    
const Main_Page = () => {

    const {posts,followers,amount, originalPosts, isSearch} = useSelector((store) => store.post)
    const {Avatar, DisplayName, Account,Page_State, Headline, Following} = useSelector((store) => store.register)
    // const [currentUser,setCurrentUser] = useState(post)
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')


    const getPost = async () => {
        // console.log("temp",temp, DisplayName)
        // temp.push("asd")
        let todo = {
            follower: Following,
            user: DisplayName
        }
        await axios.post(`${BASE_URL}/articles`, todo)
        .then((res) => {
            let newPost = res.data.articles
            dispatch(updatePost({newPost}))
            // console.log("getpost", newPost)
            // dispatch(updatePost({newPost}))
        })
        
        
    }

    const PostArticle= async () => {
        const text = document.getElementById('message')
        const preview = document.getElementById('preview')
        if (text.value !== "")
        {
            let todo = {author: DisplayName, text:text.value, url:preview.src}
            if (preview.src === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
            {
                todo = {author :DisplayName, text:text.value, url:''}
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
                    // url = res.data.url_image
                    todo.url = res.data.url_image
                })                
            }
            console.log("input data!!!", todo)


            
            await axios.post(`${BASE_URL}/article`, todo)
            .then((res) => {
                console.log(res.data)
                let temp = res.data
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
                text.value = ""
                preview.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s'
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




    const updateStatus = async () => {
        let status = document.getElementById('status_input')
        let todo = {
            headline: status.value
        }
        await axios.put(`${BASE_URL}/headline`, todo)
        .then((res) => {
            console.log("output displayname", document.cookie.split('=')[1])
            dispatch(new_status(status.value))
            status.value = ''
        })
        // dispatch(new_status(status.value))
        // status.value = ''
        
    }

    useEffect(() => {
        let data = JSON.parse(window.localStorage.getItem("userInformation"))
        dispatch((load_data(data)))
    },[])

    useEffect(()=> {    
        getPost()

    },[Following])


    const handleLogout = async () => {
        let addinglist = []
        let newPost = []
        await axios.put(`${BASE_URL}/logout`)
        .then((res) => {
            console.log(res)
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
            // clear cookie
            console.log("cookie", document.cookie)
        })
    }

    const handleSetSearchPost = (e) => {
        setQuery(e.target.value)
    }

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById('preview');
            preview.src = src;
            preview.style.display = "block";
        }
    }




    return (
        // set section center
        
        <div className='bg-gray-400'>
            <div className="float-container">
                {/* <div></div> */}
                <div className='bg-white float-child-1 rounded-lg'>
                    {/* <div className="grid gap-6 mb-6 md:grid-cols-2 "> */}
                        {/*<div  className='float-container'>*/}
                    <div>

                        <div>
                            <Link to={'/'} >
                                <button type="button" onClick={handleLogout}
                                        // className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                        // className="button w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg text-center">
                                        className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 rounded-full button">
                                    Log out

                                </button>
                            </Link>
                        </div>
                        
                        <div>
                            <Link to={'profile'}>
                                <button type="button"
                                        className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 rounded-full button">
                                    Profile
                                </button>

                            </Link>
                        </div>
                    </div>

                    <div>
                        <img src={Avatar} height="300" width="200"
                            className="rounded-full h-24 w-24 mx-auto my-0"/>
                            
                    </div>
                    <div>
                        <h1 className="text"
                            htmlFor="user_avatar">{DisplayName}</h1>
                    </div>
                    <div>
                        <h3 className="text" id="status">{Headline}</h3>
                    </div>
                    <div className="mb-6">

                        <input type="text" id="status_input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                    </div>
                    <button id="update_button" type="button" onClick={updateStatus}
                            // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Update Status
                    </button>
                </div>
                <div id="write_post" className='bg-white float-child-2 rounded-lg'>
                    <div className="float-post-container">

                        <div>
                            <div className="float-child-post-1 grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <input
                                        className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        aria-describedby="user_avatar_help" id="file" type="file"
                                        onChange={(event)=>handleFileUpload(event)}
                                        >
                                    </input>
                                </div>
                            </div>

                            <div className="float-child-post-2">
                                <textarea id="message" rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write something here">
                                </textarea>
                            </div>
                        </div>
                        <div>
                            <img id="preview" className="preview_img" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s'} height="400" width="300"></img>
                        </div>
                        {/*<div className="grid gap-6 mb-6 md:grid-cols-2">*/}

                        <div className="float-child-post-1 ">
                            <button id="post_text" type="button" onClick={clear_post}
                                    className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                        Cancel
                            </button>

                        </div>
                        <div className="float-child-post-2">
                            <button type="button" onClick={() => PostArticle()}
                                    className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                        Post
                            </button>
                        </div>
                        
                    </div>
                    <div className="search_style">
                        <input type="text" id="search_input" onChange={handleSetSearchPost} placeholder="Search Post"
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        {/* <button onChange={handleSetSearchPost}  id="search_button" type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            Search
                        </button>
                        <button onClick={handleClearSearchPost}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            Cancel
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="float-container">
                <div className='bg-white float-child-1 rounded-lg'>
                        <ReadUser login_name={Account} />


                </div>
                {/* <div className='back-color float-child-2 rounded-lg'> */}
                    {/* <div className="grid gap-6 mb-6 md:grid-cols-2 "> */}
                    <div className="float-child-2 rounded-lg">
                        {/* <Feed query={query} posts={posts}/> */}
                        <PaginatedItems posts={posts} query={query} itemsPerPage={10}/>


                    </div>
                {/* </div> */}
            </div>


        </div>
    );
}

function clear_post () {
    const text = document.getElementById('message')
    let preview = document.getElementById('preview')
    console.log(preview.src)
    preview.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s'
    console.log(text.value)
    text.value = '';
}
export default Main_Page;