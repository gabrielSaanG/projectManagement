import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";
import NavBarComponent from "../../../Components/NavBarComponent/NavBarComponent";
import TopNavBarComponent from "../../../Components/NavBarComponent/TopNavBarComponent";
import React from "react";

export const PrivateRoutes = () => {
    const token = localStorage.getItem("token")
    let auth = {
        token: token
    }


    return (
        auth.token ? <div className="flex flex-row ">
            <NavBarComponent/>
            <Outlet/>
            </div> :  <Navigate to={'/'}/>
    )
}