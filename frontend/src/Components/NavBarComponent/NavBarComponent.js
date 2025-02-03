import React from 'react'
import ImageComponent from "../ImageComponent/ImageComponent";
import logo from "../../Images/logo.png"
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { IoIosGift } from "react-icons/io";


export default function NavBarComponent() {
    return (
        <nav className="h-screen w-fit flex flex-col p-14 bg-white rounded">
            <div>
                <ImageComponent imageSource={logo}/>
            </div>

            <ul className="flex flex-col mt-20 items-start gap-8">
                <li className="flex items-center gap-2 cursor-pointer"><AiFillHome className="text-gray-500 text-xl"/><a className=" text-xl text-gray-500 ">Início</a></li>
                <li className="flex items-center gap-2 cursor-pointer"><IoSearch className="text-gray-500 text-xl"/><a className=" text-xl text-gray-500 ">Pesquisar</a></li>
                <li className="flex items-center gap-2 cursor-pointer"><GiBookshelf className="text-gray-500 text-xl"/> <a className=" text-xl text-gray-500 ">Minha Estante</a></li>
                <li className="flex items-center gap-2 cursor-pointer"><IoIosGift className="text-gray-500 text-xl"/><a className=" text-xl text-gray-500 ">Contribua</a></li>
            </ul>
        </nav>
    )
}