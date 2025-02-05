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
        auth.token ?

            <div>
                <div>
                    <div className="flex flex-row bg-gray-100">
                        <NavBarComponent/>
                        <div className="bg-gray-100 overflow-auto">
                            <TopNavBarComponent/>
                            <Outlet/>
                        </div>

                    </div>
                </div>


            </div> : <Navigate to={'/'}/>
    )
}