// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import {Checkbox, Label, TextInput} from "flowbite-react";
// import { BrowserRouter as Router, Link, Route, Switch as Routes} from "react-router-dom";
// import App from './App'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './store';
import { useEffect } from 'react';

const Local = () => {

    const initializeLocalStorage = () => {
        // console.log("initializeLocalStorage")
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
    }

    useEffect(() => {
        initializeLocalStorage();
        document.title = "RiceBook";
    }, [])

    return (
        <></>
    )

}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
    <React.StrictMode>
        <Local/>
        <Provider  store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
