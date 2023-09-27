import React, { useState, useEffect } from 'react';
import '../main.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFollow, unFollow, update } from '../../feature/post/postSlice';
import { add_follower, remove_follower, update_follower, update_follower_avatar } from '../../feature/register/registerSlice';
import axios from 'axios';
import { BASE_URL } from '../../url';


const userUrl = "https://jsonplaceholder.typicode.com/users"
const postUrl = "https://jsonplaceholder.typicode.com/posts"




export const UserList = async () => {
    const response = await fetch(userUrl)
    const newUser = await response.json()
    return newUser
}
export const PostList = async () => {
    const response = await fetch(postUrl)
    const newPost = await response.json()
    return newPost
}
export let UserNameList = []
export let UserPasswordList = []
export let UserPostList = []
export let CurrentFollower = []
export let UserInformation = []


export const GetAllData = (props) => {

    const  dispatch = useDispatch()
    // const {CurrentPost} = useSelector((store)=>store.post)

    const getUser = async () => {
        const newUser = await UserList()
        let temp = []
        let index = -100
        const newName = newUser.map((user) => 
        {
            if (user.username === props.login_name) 
                index = user.id - 1

            temp.push(user.address.street)
            return user.username
        }
            
        )

        UserPasswordList = temp
        UserNameList = newName
        if (index !== -100){

            let addinglist = []
            for (let i = 1;i < 4;i++) {
                let newindex = (index + i) %10
                addinglist.push({
                    id:newUser[newindex].id,
                    name: newUser[newindex].name
                })
            }
            dispatch(update({addinglist}))
            CurrentFollower = addinglist
            
        }
        
    }

    const getPost = async () => {
        const newPost = await PostList()
        UserPostList = newPost

    }
    

    useEffect(() => {
        
        getUser();
        getPost();
    },[])
    return <></>
}

export const Get_Follower = (props) => {
    const [curr_Follower,setCurr_Follower] = useState([]) // store current follower
    const [curr_Follower_Info,setCurr_Follower_Info] = useState([]) // store current follower info
    const [newfollowerName,setNewfollowerName] = useState([]) // store new follower
    // const {Following} = useSelector((store)=>store.register)

    const dispatch = useDispatch()

    
    const InitialFollower = async () => {

        let new_follower = []
        await axios.get(`${BASE_URL}/following`)
            .then((res) => {
            let temp = res.data.following
            dispatch(update_follower({temp}))
            for (let i = 0; i < temp.length;i++) {
                new_follower.push(temp[i])
            }
            setCurr_Follower(new_follower)
        })
        await axios.post(`${BASE_URL}/followerProfile`, {follower: new_follower})
        .then((res) => {
            setCurr_Follower_Info(res.data)
            let temp = res.data.map((item) => 
                {
                    return {username: item.username, avatar: item.avatar}
                }
            )
            dispatch(update_follower_avatar({temp}))
        })

    }

    useEffect(() => {
        InitialFollower();
    },[])

    const Addnewfollower = async () => {
        let new_follower = newfollowerName
        let temp1 = curr_Follower
        await axios.put(`${BASE_URL}/following/${new_follower}`)
        .then((response) => {
            temp1.push(new_follower)
            setCurr_Follower(temp1)
            let temp = response.data.following
            dispatch(update_follower({temp}))
        })
        .catch((error) => {
            console.log(error)
            alert("Please enter a valid username")
        })
        // setName('')
        // console.log("current", curr_Follower)
        await axios.post(`${BASE_URL}/followerProfile`, {follower: temp1})
        .then((res) => {
            // console.log("follower data", res.data)
            setCurr_Follower_Info(res.data)
            let temp = res.data.map((item) => 
                {
                    return {username: item.username, avatar: item.avatar}
                }
            )
            dispatch(update_follower_avatar({temp}))
        })

    }

    const handleUnFollow = async (name) => {
        const newUser = curr_Follower.filter((person) => 
            person !== name
        )
        
        await axios.delete(`${BASE_URL}/following/${name}`)
        .then((res) => {
            let temp = curr_Follower.filter((person) => 
                person !== name
            )
            dispatch(update_follower({temp}))
            setCurr_Follower(newUser)

        })

        await axios.post(`${BASE_URL}/followerProfile`, {follower: newUser})
        .then((res) => {
            // console.log("follower data", res.data)
            setCurr_Follower_Info(res.data)
            let temp = res.data.map((item) => 
                {
                    return {username: item.username, avatar: item.avatar}
                }
            )
            dispatch(update_follower_avatar({temp}))
        })
    }

    return (
        <div className="mt-2">
            <h1 className='text mb-6'>Contacts</h1>
            <div className=" ">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {curr_Follower_Info.map((user,index) => {

                        return (
                            <li key={index} className="grid grid-cols-8 py-2 sm:py-4">

                                <div className='col-span-2'>

                                    <img src={user.avatar} alt='' width="200px"
                                        className="rounded-full h-12 w-12"/>
                                </div>
                                <div className='col-span-4 flex-1'>
                                    <p className='text-base font-medium text-gray-900 truncate dark:text-white'>{user.username}</p>
                                    <p className='text-xs font-medium text-gray-900 truncate dark:text-white'> {user.headline}</p>
                                </div>
                                <div className='col-span-2'>
                                    <button 
                                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-400"
                                        onClick={()=>handleUnFollow(user.username)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="w-full flex justify-center mt-6 mb-4 space-x-2">
                <input type="text" id="follower-input" value={newfollowerName} onChange={(e)=>setNewfollowerName(e.target.value)} placeholder={"Username"}
                    className="ml-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                <button type="button" id="add_follower" onClick={Addnewfollower}
                        // className="px-6 text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        className="mr-4 inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
                            Add
                </button>
            </div>
            
        </div>
    )
}
