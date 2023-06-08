import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./feature/register/registerSlice";
import postReducer from './feature/post/postSlice'


export const store = configureStore({
    reducer: {
        post: postReducer,
        register: registerReducer
    }
})