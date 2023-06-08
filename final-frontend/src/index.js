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
        console.log("initializeLocalStorage")
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
        initializeLocalStorage()
    }, [])

    return (
        <></>
    )

}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
    <React.StrictMode>
        {/* initialize local storage */}
        <Local/>
        <Provider  store={store}>
            {/* <div className="bg-white rounded-xl overflow-hidden shadow-lg p-5 flex space-x-5"> */}
            <App />
        </Provider>
    </React.StrictMode>,
)

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store} >

//         <App />
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );


// class MainPage extends React.Component {
    //     constructor() {
        //         super();
//         this.state={
//             show_login:true,
//             show_signup:false,
//             button_value:"Sign Up"
//         }
//     }
//     render() {
//         return (
//
//             <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
//                 <div className="container flex flex-wrap justify-between items-center mx-auto">
//                     {/*<a href="https://flowbite.com/" className="flex items-center">*/}
//                     <a className="flex items-center">
//                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
//                         <span
//                             className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RiceBook</span>
//                     </a>
//                     <button data-collapse-toggle="navbar-default" type="button"
//                             className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                             aria-controls="navbar-default" aria-expanded="false">
//                         <span className="sr-only">Open main menu</span>
//                         <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
//                              xmlns="http://www.w3.org/2000/svg">
//                             <path fill-rule="evenodd"
//                                   d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                                   clip-rule="evenodd"></path>
//                         </svg>
//                     </button>
//                     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//                         <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                             {/*<li>*/}
//                             {/*    <a href="#"*/}
//                             {/*       className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">*/}
//                             {/*        Login</a>*/}
//                             {/*</li>*/}
//                             <li>
//                                 <a onClick={()=>{this.setState(
//                                     {
//                                         show_login:!this.state.show_login,
//                                         show_signup:!this.state.show_signup
//                                         // button_value:
//
//                                     })}}
//                                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
//                                     {/*Sign Up*/}
//                                     {this.state.button_value}
//
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 {/*<div class="text-center">*/}
//                 <div className="flex flex-col items-center justify-center">
//                     {this.state.show_login?
//                     <form className="flex flex-col gap-4">
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label
//                                     htmlFor="email1"
//                                     value="Your email"
//                                 />
//                             </div>
//                             <TextInput
//                                 id="email1"
//                                 type="email"
//                                 placeholder="name@flowbite.com"
//                                 required={true}
//
//                             />
//                         </div>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label
//                                     htmlFor="password1"
//                                     value="Your password"
//                                 />
//                             </div>
//                             <TextInput
//                                 id="password1"
//                                 type="password"
//                                 required={true}
//                             />
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Checkbox id="remember" />
//                             <Label htmlFor="remember">
//                                 Remember me
//                             </Label>
//                         </div>
//                         <div className="flex flex-col justify-center">
//                             <button type="submit"
//                                     className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
//                                 Login
//                                 {/*<Link to */}
//                             </button>
//                         </div>
//                     </form>
//                         : null}
//
//
//                 </div>
//
//                 {/* Sign Up Form*/}
//                 <div className="flex flex-col items-center justify-center">
//                     {this.state.show_signup?
//                     <form className="flex flex-col gap-4">
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label
//                                     htmlFor="email2"
//                                     value="Your email"
//                                 />
//                             </div>
//                             <TextInput
//                                 id="email2"
//                                 type="email"
//                                 placeholder="name@flowbite.com"
//                                 required={true}
//                                 shadow={true}
//                             />
//                         </div>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label
//                                     htmlFor="password2"
//                                     value="Your password"
//                                 />
//                             </div>
//                             <TextInput
//                                 id="password2"
//                                 type="password"
//                                 required={true}
//                                 shadow={true}
//                             />
//                         </div>
//                         <div>
//                             <div className="mb-2 block">
//                                 <Label
//                                     htmlFor="repeat-password"
//                                     value="Repeat password"
//                                 />
//                             </div>
//                             <TextInput
//                                 id="repeat-password"
//                                 type="password"
//                                 required={true}
//                                 shadow={true}
//                             />
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Checkbox id="agree" />
//                             <Label htmlFor="agree">
//                                 I agree with the{' '}
//                                 <a
//                                     href="/forms"
//                                     className="text-blue-600 hover:underline dark:text-blue-500"
//                                 >
//                                     terms and conditions
//                                 </a>
//                             </Label>
//                         </div>
//                         <div className="flex flex-col justify-center">
//                             <button type="submit"
//                                     className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
//                                 Sign Up
//                             </button>
//                         </div>
//                     </form>
//                         : null}
//
//                 </div>
//                 <div>
//                     <button
//                             className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
//                         <Link to={'/register'}>Sign Up</Link>
//
//
//                     </button>
//                 </div>
//             </nav>
//
//
//         )
//     }
//
// }
// class Test extends React.Component {
//     render() {
//         return (
//             <div>
//                 <Link to={"/register"}>123</Link>
//
//             </div>
//         );
//     }
// }



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <Router>
//           <Routes>
//               <Route exact path={"/"}>
//                   <MainPage />
//
//                   {/*<Test />*/}
//               </Route>
//               <Route path={"/register"}>
//                   <Register/>
//               </Route>
//           </Routes>
//       </Router>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
