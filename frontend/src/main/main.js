import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './main.css'
import { Get_Follower } from './component/follower'
import { PaginatedItems} from './component/post'
import { Personal } from './component/personal'
import { PostField } from './component/postField'
import { useDispatch, useSelector } from "react-redux";
import { updatePost, update} from "../feature/post/postSlice";
import { Logout_clear, Page_action, load_data } from "../feature/register/registerSlice";
import axios from "axios";
import { BASE_URL } from "../url";


const Main_Page = () => {

    const {posts} = useSelector((store) => store.post)
    const {Avatar, DisplayName, Account, Headline, Following} = useSelector((store) => store.register)
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

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

export default Main_Page;