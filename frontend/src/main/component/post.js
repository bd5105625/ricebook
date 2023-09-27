import React from 'react'
import { useDispatch, useSelector,} from 'react-redux'
import { useState, useEffect } from 'react'
import './../main.css'
import {Comment} from '../../feature/post/comment'
import { clickComment, clickEdit, editText } from '../../feature/post/postSlice'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import { BASE_URL } from '../../url'
import './page.css'
import './pagination.css'


export function Feed(props) {
    const dispatch = useDispatch()
    const {Account, Avatar ,DisplayName, Following_Avatar} = useSelector((store) => store.register)

    const handleChangeText = async (e,index, _id) => {
        let newText = e.target.value
        dispatch(editText({index:index,text:newText}))
    }

    const handleEdit = async (index, _id, newText) => {
        if (props.posts[index].author === DisplayName) {
            dispatch(clickEdit({index:index}))

            if (props.posts[index].isEdit) {
                await axios.put(`${BASE_URL}/articles/${_id}`, {user: props.posts[index].author ,text:newText})
                .then((res) => {
                    console.log(res)
                })
            }
            else {
                console.log("edit")
            }
        }
        else {
            alert("You can't edit this post!")
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
    }

    useEffect(() => {

    },[])
    useEffect(() => {

    }, [props.posts])

    const testAvatar = (author) => {
        // return {
            if (author === Account) {
                return <img src={Avatar} alt='avatar' className='mx-2 rounded-full h-12 w-12 my-0'/>                
            }

            let abc = Following_Avatar.map((item, index) => {
                if (item.username === author) {
                    return <img key={index} src={item.avatar} alt='avatar' className='rounded-full h-12 w-12 my-0'/>
                }
            })
            return abc
        // }
    }

    if (props.posts) {
        const filterPosts = props.posts.filter((post) => {
            if (props.query === "") {
                return post
            }
            else {
                return post.text.includes(props.query) || post.author.includes(props.query)
            }
            // return post
        })

        return (
            <div>
                {filterPosts.map((post, index) => {
                    return (
                        <div key={index} className=" comment_style my-4 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">

                            <div className='flex flex-1 w-100 my-3 items-center '>
                                {testAvatar(post.author)}
                                <div className='ml-2'>
                                    <span>{post.author}</span>
                                </div>
                            </div>
                            <div className=''>
                                {post.isEdit ? (
                                    <input type="text" className="w-full rounded-lg border-gray-200 p-3 text-sm" 
                                    value={post.text} onChange={(e)=>handleChangeText(e,index, post._id)} />
                                    ) : (
                                        <h4 >{post.text}</h4>
                                        )}
                            </div>
                            <div>
                                <img key={index} id={index} src={post.img} className="mx-auto" alt='' width=""></img>
                            </div>
                            <div className="float-post-container post_style"> 

                                <button onClick={() => {
                                        handleEdit(index, post._id, post.text)
                                        // test()
                                    }}
                                    id="edit"
                                    className="text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    {post.isEdit ? "Save" : "Edit"}
                                </button>

                                <button onClick={()=>{
                                    dispatch(clickComment({index}))
                                }}
                                className="text-black bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                { post.isComment ? "Hide Comment" : "Show Comment" }
                                </button>
                            </div>
                            <div className=''>
                                { post.isComment && < Comment post={post} index = {index} author={post.author} comments={post.comments} _id={post._id}/>}

                            </div>

                            
                        </div>
                    )
                })}

            </div>
            
        )
    }
}

export function PaginatedItems({ posts, query, itemsPerPage }){
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const {Followings} = useSelector((store) => store.register)

    useEffect(() => {
        // Fetch items from another resources.
        setEndOffset(itemOffset + itemsPerPage);
        setPageCount(Math.ceil(posts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, Followings, posts]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % posts.length;
        setItemOffset(newOffset);
    };

    return (
        <>
        {/* <Items currentItems={currentItems} /> */}
        <div className='mt-6 mx-10 '>

            <ReactPaginate className=''
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                />
        </div>
        <Feed posts={posts.slice(itemOffset,endOffset)} query={query}/>
        </>
    );
}

// export default Feed