import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Views/Pages/ProtectedRoutes/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AlertsProvider from "./Alerts/alerts-context";
import LoginPage from "./Views/Pages/LoginPage/LoginPage";
import RegisterPage from "./Views/Pages/RegisterPage/RegisterPage";
import {PrivateRoutes} from "./Views/Pages/ProtectedRoutes/PrivateRoutes";
import MainPage from "./Views/Pages/MainPage/MainPage";
import BookPage from "./Views/Pages/BookPage/BookPage";
import {BookContextProvider} from "./Context/BookContext/BookContext"
import {SkeletonTheme} from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter>
            <SkeletonTheme baseColor="#E4E4E4" highlightColor="#FFFFFF">
                <AlertsProvider>
                    <BookContextProvider>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route element={<PrivateRoutes/>}>

                                <Route path="main" element={<MainPage/>}/>
                                <Route path="book_page/:token" element={<BookPage/>}/>

                        </Route>
                    </Routes>
                    </BookContextProvider>
                </AlertsProvider>
            </SkeletonTheme>
        </BrowserRouter>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
