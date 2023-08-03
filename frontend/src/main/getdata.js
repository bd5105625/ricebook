import React, { useState, useEffect } from 'react';
import './main.css'
import {reducer} from './reducer'
import { useDispatch, useSelector } from 'react-redux';
import { addFollow, unFollow, update } from '../feature/post/postSlice';
import { add_follower, remove_follower, update_follower, update_follower_avatar } from '../feature/register/registerSlice';
import axios from 'axios';
import { BASE_URL } from '../url';


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
// const FollowerState = {
//     people: await UserList(),
//     headline: '',
    
// }

export const GetAllData = (props) => {

    const  dispatch = useDispatch()
    const {CurrentPost} = useSelector((store)=>store.post)

    const getUser = async () => {
        const newUser = await UserList()
        UserInformation = newUser
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

export const ReadUser = (props) => {
    const [name,setName] = useState('')
    const [curr_Follower,setCurr_Follower] = useState([]) // store current follower
    const [curr_Follower_Info,setCurr_Follower_Info] = useState([]) // store current follower info
    const {Following} = useSelector((store)=>store.register)

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

    useEffect(() => {


    },[curr_Follower])

    const Addnewfollower = async () => {
        let new_follower = document.getElementById("follower-input").value
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
        setName('')
        // console.log("current", curr_Follower)
        await axios.post(`${BASE_URL}/followerProfile`, {follower: temp1})
        .then((res) => {
            console.log("follower data", res.data)
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

        console.log("current", curr_Follower)
        await axios.post(`${BASE_URL}/followerProfile`, {follower: newUser})
        .then((res) => {
            console.log("follower data", res.data)
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
        <div className="text_align_center">
            {/* font size */}
            <h1 className='text'>Current Following</h1>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                {curr_Follower_Info.map((user,index) => {

                    return (
                        <div key={index} className="mb-6 ">

                            
                            <img src={user.avatar} alt='' width="200px"
                                className="rounded-full h-24 w-24 mx-auto my-0"/>
                            <h1 className='text'>{user.username}</h1>
                            <h5> {user.headline}</h5>
                            <button 
                                className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                onClick={()=>handleUnFollow(user.username)}>
                                unfollow
                            </button>
                        </div>
                    )
                })}
            </div>
            <div>
                <div className="mb-6">
                    <input type="text" id="follower-input" value={name} onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>

                <button type="button" id="add_follower" onClick={Addnewfollower}
                        className="w-full text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Add
                </button>
            </div>
            
        </div>
    )
}
