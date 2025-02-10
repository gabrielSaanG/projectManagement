import React, {useState} from 'react'
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import { IoSearch } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import ImageComponent from "../ImageComponent/ImageComponent";
import user from '../../Images/user.png'
import useBookContext from "../../Context/BookContext/BookContext";
import BookModalComponent from "../ModalComponent/BookModalComponent";
import BookSearchModalComponent from "../ModalComponent/BookSearchModalComponent";

export default function TopNavBarComponent () {
    const [handleDropdown, setHandleDropdown] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
    const [bookDropdown, setBookDropdown] = useState(false)
    const {book} = useBookContext()


    const dropdownFunction = (e) => {
        setHandleDropdown(!handleDropdown)
    }

    const profileDropdownFunction = (e) => {
        setProfileDropdown(!profileDropdown)
    }

    const handleBookDropdown = (e) => {
        setBookDropdown(!bookDropdown)
    }

    return (
        <div className="flex justify-evenly h-fit">
            <div className="">
                <ModalComponent>
                    <div className="mx-4 text-gray-800 ">
                        <button className="text-sm" onClick={dropdownFunction}>Filtrar</button>

                        <div className="relative left-[-30px]">
                            {handleDropdown && (
                                <div className="absolute overflow-auto flex flex-col gap-4 mt-4 bg-white p-4 rounded-2xl shadow-md">
                                    <a className=" border-gray-400 cursor-pointer">Todos</a>
                                    <a className=" border-gray-400 cursor-pointer">Romance</a>
                                    <a className="border-gray-400 cursor-pointer">Drama</a>
                                </div>
                            )}
                        </div>




                    </div>
                    <div onClick={handleBookDropdown}>
                        <InputComponent placeholder="Pesquisar"/>
                        {bookDropdown &&
                        book.map((item) => {
                            return (
                                <div className="relative h-fit">
                                    <ul className="absolute h-screen w-screen flex flex-col">
                                        <BookSearchModalComponent imageURL={"data:image/png;base64, " + item.imageURL}
                                                            title={item.title}
                                                            author={item.author} date={item.date} rating={item.rating}
                                                            token={item.token}/>
                                    </ul>
                                </div>
                            )
                        })
                        }
                    </div>

                    <IoSearch className="text-orange-500 text-2xl mr-4 ml-4"/>
                </ModalComponent>
            </div>

            <div>
                <ModalComponent>
                    <div className="flex gap-4 text-gray-500 ">
                        <div className="flex items-center">
                            <CiClock2 className="text-orange-500 ml-5 mr-2"/>
                            <h1>09:00 AM</h1>
                        </div>
                        <div className="flex items-center">
                            <FaRegCalendarAlt className="text-orange-500 mr-2"/>
                            <h1 className="mr-5">4-Mar-2023</h1>
                        </div>

                    </div>

                </ModalComponent>
            </div>

            <div className="flex">
                <ModalComponent>
                    <div className="flex gap-3 items-center mx-2 cursor-pointer " onClick={profileDropdownFunction}>
                        <div className="max-w-8">
                            <ImageComponent imageSource={user}/>
                        </div>

                        <div>
                            Gabriel
                        </div>

                        <div className="relative left-[-100px] mt-10">
                            {profileDropdown && (
                                <div
                                    className="absolute overflow-auto flex flex-col gap-4 mt-4 bg-white p-4 rounded-2xl shadow-md">
                                    <a className=" border-gray-400 cursor-pointer">Todos</a>
                                    <a className=" border-gray-400 cursor-pointer">Romance</a>
                                    <a className="border-gray-400 cursor-pointer">Drama</a>
                                </div>
                            )}
                        </div>

                    </div>


                </ModalComponent>
            </div>
        </div>
    )
}