import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './main.css'
import { Get_Follower } from './component/follower'
import { PaginatedItems} from './component/post'
import { Personal } from './component/personal'
import { PostField } from './component/postField'
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost, update} from "../feature/post/postSlice";
import { Logout_clear, new_status, Page_action, load_data } from "../feature/register/registerSlice";
import axios from "axios";
import { BASE_URL } from "../url";



    
const Main_Page = () => {

    const {posts} = useSelector((store) => store.post)
    const {Avatar, DisplayName, Account, Headline, Following} = useSelector((store) => store.register)
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

    const [statusText, setStatusText] = useState('')


    const getPost = async () => {

        let todo = {
            follower: Following,
            user: DisplayName
        }
        await axios.post(`${BASE_URL}/articles`, todo)
        .then((res) => {
            let newPost = res.data.articles
            dispatch(updatePost({newPost}))

        })
        
        
    }

    const updateStatus = async () => {
        let todo = {
            headline: statusText
        }
        await axios.put(`${BASE_URL}/headline`, todo)
        .then((res) => {
            // console.log("output displayname", document.cookie.split('=')[1])
            dispatch(new_status(statusText))
            setStatusText('')
        })

        
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
            // clear cookie
            // console.log("cookie", document.cookie)
        })
    }

    const handleSetSearchPost = (e) => {
        setQuery(e.target.value)
    }





    return (
        // set section center
        
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
                    <Link to={'profile'}>
                        <button
                            className="rounded-full bg-gray-400 px-4 py-1 mr-10 bg-white text-black">
                                {"Profile"}
                        </button>
                    </Link>
                </div>

            </nav>
            {/* <div className=""> */}
            <div className="grid grid-cols-8 gap-6 mx-10">
                {/* <div> */}

                    < Personal />
                {/* </div> */}
                
                <div id="write_post" className='bg-white col-span-4 rounded-lg mt-10 mx-10'>
                    <div className="bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <PostField handleSetSearchPost={handleSetSearchPost} getPost={getPost} />
                    </div>
                    <div className="">
                        {/* <Feed query={query} posts={posts}/> */}
                        <PaginatedItems posts={posts} query={query} itemsPerPage={10}/>
                    </div>
                </div>

                <div className="mb-auto col-span-2 w-full mt-10 mx-10 max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <Get_Follower login_name={Account} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// const PostField = ({handleSetSearchPost, getPost}) => {

//     const {DisplayName} = useSelector((store) => store.register)
//     const dispatch = useDispatch()
//     const [imgSrc, setImgSrc] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
//     const [message, setMessage] = useState('')

//     const handleFileUpload = (event) => {
//         if (event.target.files.length > 0) {
//             setImgSrc(URL.createObjectURL(event.target.files[0]))

//             // not sure do i need this line
//             // preview.style.display = "block"; 
//         }
//     }

//     const PostArticle= async () => {

//         if (message !== "")
//         {
//             let todo = {author: DisplayName, text:message, url:imgSrc}
//             if (imgSrc === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
//             {
//                 todo = {author :DisplayName, text:message, url:''}
//             }
//             else {
//                 var formData = new FormData()
//                 var imageFile = document.querySelector('#file')
//                 formData.append("image", imageFile.files[0])
//                 await axios.post(`${BASE_URL}/avatar`, formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 })
//                 .then((res) => {
//                     todo.url = res.data.url_image
//                 })                
//             }


            
//             await axios.post(`${BASE_URL}/article`, todo)
//             .then((res) => {
//                 let temp = res.data
//                 let newPost = {
//                     userId: 0,
//                     id: new Date().getTime().toString(),
//                     title: "",
//                     body: todo.text ,
//                     img: todo.url,
//                     name: DisplayName,
//                     isComment: false
//                     // date: new Date()
//                 }
//                 dispatch(addPost({newPost}))
//                 setMessage('')
//                 setImgSrc('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
//                 getPost()
//                 alert("Post Success")
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         }
//         else {
//             alert('Please enter some words')
//         }
//     }

//     const clear_post = () => {
//         setMessage('')
//         setImgSrc('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweURjQnK6cFM2Lt1yAM1UxDF32IpFxU77vJxdGUggBg&s')
//     }

//     return (
//         <>
//         <div className="float-post-container">
//             <div>
//                 <div className="float-child-post-1 grid gap-6 mb-6 md:grid-cols-2">
//                     <div>
//                         <input
//                             className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                             aria-describedby="user_avatar_help" id="file" type="file"
//                             onChange={(event)=>handleFileUpload(event)}
//                             >
//                         </input>
//                     </div>
//                 </div>

//                 <div className="float-child-post-2">
//                     <textarea id="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)}
//                         className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Write something here">
//                     </textarea>
//                 </div>
//             </div>
//             <div>
//                 <img id="preview" className="preview_img" src={imgSrc} height="400" width="300"></img>
//             </div>

//             <div className="float-child-post-1 ">
//                 <button id="post_text" type="button" onClick={clear_post}
//                         className="w-full text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
//                             Cancel
//                 </button>

//             </div>
//             <div className="float-child-post-2">
//                 <button type="button" onClick={() => PostArticle()}
//                         className="w-full text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
//                             Post
//                 </button>
//             </div>

//             </div>
//             <div className="search_style">
//             <input type="text" id="search_input" onChange={handleSetSearchPost} placeholder="Search Post"
//                 className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//             </input>
//         </div>
//         </>
//     )
// }

export default Main_Page;