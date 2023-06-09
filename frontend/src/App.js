import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './landing/registration'
import Main from './main/main'
import Profile from './profile/profile'
//important part of the code, set withCredentials to true to allow cookie to be sent to client
axios.defaults.withCredentials = true;


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Register />}></Route>
                <Route path='/main' element={<Main/>}></Route>
                <Route path='/main/profile' element={<Profile/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;