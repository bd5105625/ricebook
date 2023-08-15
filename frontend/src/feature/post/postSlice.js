import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    followers: [],
    posts: [],
    originalPosts: [],
    newPosts: [],
    comment: [],
    amount: 0,
    isComment: Array(10).fill(false),
    isEdit: Array(10).fill(false),
    isSearch: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        update: (state, {payload}) => {
            state.followers = payload.addinglist
        },
        updatePost: (state, {payload}) => {
            state.posts = (payload.newPost)
            state.amount = state.posts.length
            state.isComment = Array(state.amount).fill(false)
            state.isEdit = Array(state.amount).fill(false)
        },
        unFollow: (state, {payload}) => {
            state.followers = payload.newUser
            state.amount = state.posts.length
        },
        addFollow: (state, {payload}) => {
            state.followers = payload.newUser
            state.amount = state.posts.length
        },
        clickComment: (state, {payload}) => {
            state.posts[payload.index].isComment = ! state.posts[payload.index].isComment
        },
        clickEdit: (state, {payload}) => {
            state.posts[payload.index].isEdit = ! state.posts[payload.index].isEdit
        },
        addPost: (state, {payload}) => {
            state.newPosts = payload.newPost
            state.posts.unshift(payload.newPost)
            state.amount = state.posts.length
        },
        handleSearch: (state, {payload}) => {
            state.isSearch = ! state.isSearch
            state.posts = (payload.newPost)
            state.amount = state.posts.length
        },
        handlerSearchCancel: (state) => {
            state.isSearch = ! state.isSearch
            
        },
        editText: (state, {payload}) => {
            state.posts[payload.index].text = payload.text
        },
        addComment: (state, {payload}) => {
            state.posts[payload.index].comments.push({author: payload.author, text: payload.text})
        }
    }
})

export const {update, unFollow,addFollow,clickComment,updatePost,addPost,handleSearch, handlerSearchCancel, clickEdit, editText, addComment} = postSlice.actions
export default postSlice.reducer;

