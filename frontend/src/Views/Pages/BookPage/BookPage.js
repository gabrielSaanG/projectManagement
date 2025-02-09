import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {getBook} from "../../../Services/Book/BookServices";
import ImageComponent from "../../../Components/ImageComponent/ImageComponent";
import { IoStarOutline } from "react-icons/io5";
import { SlNote } from "react-icons/sl";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import BookDetailsBar from "../../../Components/BookDetailsBar/BookDetailsBar";
import {getAuthor} from "../../../Services/Author/AuthorServices";
import useBookContext from "../../../Context/BookContext/BookContext";
import Skeleton from "react-loading-skeleton";
import ImageCardSkeleton from "../../../Components/CardSkeleton/ImageCardSkeleton";
import {motion} from "motion/react"

export default function BookPage(){
    const params = useParams()

    const [author, setAuthor] = useState({})

    const [loading, setLoading] = useState(true)

    const {getBookContext, bookPage} = useBookContext()

    const colors = {
        orange: "#F17316",
        grey: "$6b7280"
    }

    const stars = Array(5).fill(0)



    useEffect(() => {
        const fetchData = async () => {

            const token = {
                token: params.token
            }

            try {
                await getBook(token).then(async (resp) => {
                    await getAuthor(resp[0].author).then(async (resp2) => {
                        getBookContext(resp[0])
                        setAuthor(resp2.data)
                    })
                })

            } catch (e){
                console.log(e)
            }
        }
        if (bookPage !== {}) {

            setTimeout(() => {
                fetchData()
                setLoading(false)
            }, "1000")
        }

    }, []);

    return(

        <div className="bg-[#F3F3F7] overflow-auto mx-20 my-20">
            <a className="flex w-fit h-fit items-center text-gray-600 hover:text-gray-500
             transition-colors mb-4 text-xl gap-1 cursor-pointer" href={"/main"}>
                <FaArrowLeft/>
                <p>Voltar</p>
            </a>

            <motion.div
                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}
                className="flex gap-8 justify-evenly">
                <div className="p-8 bg-white rounded-2xl w-fit h-80 flex flex-col">
                    <div className="max-w-96 w-[130px] ">
                        {loading && <ImageCardSkeleton/>}
                        <ImageComponent imageSource={"data:image/png;base64, " + bookPage.imageURL}/>
                    </div>

                    <div className="flex justify-between h-full mt-4 items-center text-gray-600">
                        <div className="cursor-pointer hover:scale-110 transition-all flex">
                            <IoStarOutline className="text-2xl"/>
                        </div>
                        <div className="cursor-pointer hover:scale-110 transition-all flex">
                            <SlNote className="text-xl"/>
                        </div>
                        <div className="cursor-pointer hover:scale-110 transition-all flex">
                            <IoShareSocialOutline className="text-2xl"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-2/4 gap-2">
                    <div>
                        <h1 className="text-3xl max-w- text-gray-800">{bookPage.title || <Skeleton/>}</h1>
                    </div>

                    <div>
                        <p className="text-gray-800">De <span
                            className="underline cursor-pointer">{bookPage.author}</span>, {bookPage.date || <Skeleton/>}</p>
                    </div>

                    <div>
                        <p className="text-gray-600">Second Edition</p>
                    </div>

                    <div className="flex">
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={24}
                                    color={(Math.round(bookPage.rating)) > index ? colors.orange : colors.grey}
                                />
                            )
                        }) }

                    </div>
                    <div className="flex text-gray-800 gap-6 w-max">
                        <p className="">{bookPage.rating || <Skeleton/>} Estrelas</p>
                        <p className="text-gray-700">25 Lendo Agora</p>
                        <p className="text-gray-700" >119 Já Leram</p>
                    </div>

                    <div className="w-fit h-fit text-green-800 font-semibold text-sm rounded-xl mt-4">
                        <p>Disponível</p>
                    </div>

                    <div className="mt-10 w-fit h-fit">
                        <buttton className="bg-green-600 text-white font-semibold
                        p-4 rounded-xl hover:bg-green-700 transition-all cursor-pointer">Ler Agora
                        </buttton>
                    </div>
                </div>
                <div className="flex justify-end w-screen">
                    <div className="bg-white w-96 h-fit rounded-xl flex flex-col gap-4 p-8">
                        <div className="text-gray-700 w-fit gap-2 flex flex-col">
                            <h1 className="text-xl font-semibold "><span className="text-orange-500">Sobre</span> o
                                Autor</h1>
                            <h1 className="text-gray-600">{bookPage.author || <Skeleton/>}</h1>
                        </div>

                        <div className="text-sm text-gray-700">
                            <p>
                                {author.authorDescription || <Skeleton/>}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h1 className="font-semibold  text-gray-700 text-xl">Outros Livros</h1>

                            <div className="flex gap-4 w-1/2">
                                <div className="hover:scale-110 transition-all cursor-pointer">
                                    <ImageComponent imageSource={"data:image/png;base64, " + bookPage.imageURL || <Skeleton/>}/>
                                </div>

                                <div className="hover:scale-110 transition-all cursor-pointer">
                                    <ImageComponent imageSource={"data:image/png;base64, " + bookPage.imageURL || <Skeleton/>}/>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </motion.div>

            <div className="w-full">
                <BookDetailsBar/>
            </div>

        </div>
    )
}