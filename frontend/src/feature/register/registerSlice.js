import {createSlice} from "@reduxjs/toolkit"

// export const LOAD_TEST = "TEST"
export const LOGIN = "LOGIN"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGOUT = "LOGOUT"
export const REGISTER = "REGISTER"
export const REGISTER_ERROR = "REGISTER_ERROR"


const initialState = {
    // Account: JSON.parse(localStorage.getItem("userInformation")).username || "",
    // DisplayName: JSON.parse(localStorage.getItem("userInformation")).displayname || "",
    // ZipCode: JSON.parse(localStorage.getItem("userInformation")).zipcode || "",
    // Phone: JSON.parse(localStorage.getItem("userInformation")).phone || "",
    // Email: JSON.parse(localStorage.getItem("userInformation")).email || "",
    // Password: "",
    // Headline: JSON.parse(localStorage.getItem("userInformation")).headline || "",
    // Page_State: "LOGOUT",
    // User_ID: "",
    // DOB: JSON.parse(localStorage.getItem("userInformation")).dob || "",
    // isLogin: false,
    // Avatar: JSON.parse(localStorage.getItem("userInformation")).avatar || "",
    // Following: JSON.parse(localStorage.getItem("userInformation")).following || [],
    Account: "",
    DisplayName: "",
    ZipCode: "",
    Phone: "",
    Email: "",
    Password: "",
    Headline: "",
    Page_State: "LOGOUT",
    User_ID: "",
    DOB: "",
    isLogin: false,
    Avatar: "",
    Following: [],
    Error: "",
    Following_Avatar: []

}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        load_data: (state, {payload}) => {
            state.Account = payload.username
            state.DisplayName = payload.displayname
            state.ZipCode = payload.zipcode
            state.Phone = payload.phone
            state.Email = payload.email
            state.Headline = payload.headline
            state.DOB = payload.dob
            state.Avatar = payload.avatar
            state.Following = payload.following
        },
        update_information: (state, {payload}) => {
            const information = payload
            state.Account = information.username || state.Account
            state.Password = ""
            state.ZipCode = information.zipcode
            state.Phone = information.phone
            state.Email = information.email
            state.DOB = information.dob || state.DOB
            state.DisplayName = information.displayname
            state.Headline = information.headline || state.Headline
            state.Avatar = information.avatar || state.Avatar
            state.Following = information.following || state.Following

            
        },
        new_status: (state, action) => {
            state.Headline = action.payload
        },
        new_Avatar: (state, action) => {
            state.Avatar = action.payload
        },
        Logout_clear: (state,actions) => {
            state.Account=""
            state.DisplayName= ""
            state.ZipCode= ""
            state.Phone= ""
            state.Email= ""
            state.Password= ""
            state.Headline= ""
            state.User_ID = ""
            state.isLogin= false
        },
        Page_action: (state, action) => {
            switch(action.payload.type) {  
                case LOGIN:
                    state.Page_State = "LOGIN"
                    state.isLogin = true
                    break
                case LOGIN_ERROR:
                    state.Page_State = "LOGIN_ERROR"
                    state.isLogin = false
                    break
                case LOGOUT:
                    state.Page_State = "LOGOUT"
                    state.isLogin = false
                    break
                case REGISTER:
                    state.Page_State = "REGISTER"
                    state.isLogin = true
                    break
                case REGISTER_ERROR:
                    state.Page_State = "REGISTER_ERROR"
                    state.isLogin = false
                    break
                default:
                    break
            }
        },
        update_follower(state, action) {
            state.Following = action.payload.temp
        },
        add_follower(state, action) {
            state.Following.push(action.payload)
        },
        remove_follower(state, action) {
            state.Following = action.payload
        },
        update_follower_avatar(state, action) {
            state.Following_Avatar = action.payload.temp
        }
    }
})

export const {load_data, update_information,Logout_clear,new_status,Page_action, new_Avatar, add_follower, remove_follower, update_follower, update_follower_avatar} = registerSlice.actions
export default registerSlice.reducer;

