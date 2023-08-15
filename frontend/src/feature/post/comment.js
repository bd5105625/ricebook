import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { addComment } from './postSlice'
import { BASE_URL } from '../../url'

export function Comment(props) {
    const {DisplayName} = useSelector((store) => store.register)
    const dispatch = useDispatch()


    const handleComment = async (author, _id) => {
        let content = document.getElementById(_id)
        if (content.value !== "") {
            await axios.post(`${BASE_URL}/comment`, {_id: props._id, author: author , text: content.value, user: DisplayName})
            .then((res) => {
                console.log(res)
            })
            dispatch(addComment({index: props.index, author: DisplayName, text: content.value}))
            content.value = ""
        }
    }

    useEffect(() => {
        console.log("comment", props.comments, props.post.comments)

    },[props.comments])
    

    return (
        <>
            <h3>Comment</h3>
            <div className='comment_style rounded-lg'>
                <CommentList comments={props.comments} />

                <div className='comment_line_style'>
                    <input type="text" id={props._id}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </input>
                    <button 
                        className="text-black bg-gray-200 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        onClick={()=> handleComment(props.author, props._id)}>
                            Comment
                    </button>
                    
                </div>
            </div>
        </>
    )
}

const CommentList = (props) => {
    return (
        props.comments.map((comment, index) => {

            return (
                <div key={index}>
                    <h5>{comment.author}: {comment.text} </h5>
                </div>
            )
        })
    )

}


