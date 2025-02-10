import React, {useEffect, useState} from 'react'
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import { IoSearch } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import ImageComponent from "../ImageComponent/ImageComponent";
import user from '../../Images/user.png'
import useBookContext from "../../Context/BookContext/BookContext";
import {motion} from "motion/react"
import BookSearchModalComponent from "../ModalComponent/BookSearchModalComponent";

export default function TopNavBarComponent () {
    const [handleDropdown, setHandleDropdown] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
    const [bookDropdown, setBookDropdown] = useState(false)
    const {book, filteredBooks, setFilteredBooks} = useBookContext()

    const [searchItem, setSearchItem] = useState('')

    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)
        const filteredItems = book.filter((book) =>
            book.title.toLowerCase().includes(e.target.value.toLowerCase())
        )

        setFilteredBooks(filteredItems)
    }



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
        <div className="flex justify-evenly h-fit relative">
            <div className="">
                <ModalComponent>

                    <div className="text-gray-800">
                        <div className="flex">
                            <button className="mx-4 text-sm" onClick={dropdownFunction}>Filtrar</button>

                            <div className="relative left-[-30px]">
                                {handleDropdown && (
                                    <div
                                        className="absolute overflow-auto flex flex-col gap-4 mt-4 bg-white p-4 rounded-2xl shadow-md">
                                        <a className=" border-gray-400 cursor-pointer">Todos</a>
                                        <a className=" border-gray-400 cursor-pointer">Romance</a>
                                        <a className="border-gray-400 cursor-pointer">Drama</a>
                                    </div>
                                )}
                            </div>

                            <div onClick={handleBookDropdown} className="">
                                <input className="border-b-2 placeholder-gray-500 w-full focus:outline-none max-w-full"
                                       onChange={handleSearchInputChange} value={searchItem} type="text"
                                />
                            </div>
                        </div>

                        <div className="absolute bg-white z-50 mt-3 shadow-md">
                            <ul className="flex flex-col w-fit max-h-[450px] overflow-auto ">
                                {bookDropdown &&
                                    filteredBooks.map((item) => {
                                        return (
                                            <motion.div
                                                initial={{y: -20}}
                                                animate={{y: 0}}
                                                exit={{y: -20}}
                                            >
                                                <BookSearchModalComponent imageURL={"data:image/png;base64, " + item.imageURL}
                                                                    title={item.title}
                                                                    author={item.author} date={item.date} rating={item.rating}
                                                                    token={item.token}/>
                                            </motion.div>


                                        )
                                    })
                                }
                            </ul>
                        </div>

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