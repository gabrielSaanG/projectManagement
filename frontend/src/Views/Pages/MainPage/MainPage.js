import React, {useEffect, useState} from 'react'
import QuoteModalComponent from "../../../Components/ModalComponent/QuoteModalComponent";
import BookModalComponent from "../../../Components/ModalComponent/BookModalComponent";
import {motion} from 'motion/react'
import 'react-loading-skeleton/dist/skeleton.css'
import BookCardSkeleton from "../../../Components/CardSkeleton/BookCardSkeleton";
import useBookContext from "../../../Context/BookContext/BookContext";

export default function MainPage () {
    const {book} = useBookContext()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function fetchData() {
            try{
            } catch (e){
                console.log(e)
            }
        }

        setTimeout(() =>{
            fetchData().then(() => {
                setLoading(false)
            })
        }, "1000")

    }, []);

    return (

                <div className="h-screen bg-[#F3F3F7] overflow-auto">

                    <div className="mx-20 my-10">
                        <QuoteModalComponent paragraph="lorem" author="John Doe"/>
                        <div className="mt-8 text-2xl font-semibold text-gray-600">
                            <h1>Recomendados para você</h1>
                        </div>

                        <div className="flex max-w-screen overflow-x-auto pb-12">
                            {loading && <BookCardSkeleton cards={8}/>}
                            {book.map(item => {
                                return item && (
                                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
                                        <BookModalComponent imageURL={"data:image/png;base64, " + item.imageURL}
                                                            title={item.title}
                                                            author={item.author} date={item.date} rating={item.rating}
                                                            token={item.token}/>
                                    </motion.div>

                                )
                            })}
                        </div>

                        <div className="mt-8 text-2xl font-semibold text-gray-600">
                            <h1>Leituras recentes</h1>
                        </div>

                        <div className="flex max-w-screen overflow-x-auto pb-12">
                            {loading && <BookCardSkeleton cards={8}/>}
                            {book.map(item => {
                                return item && (
                                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                                transition={{duration: 0.5}}>
                                        <BookModalComponent imageURL={"data:image/png;base64, " + item.imageURL}
                                                            title={item.title}
                                                            author={item.author} date={item.date} rating={item.rating}
                                                            token={item.token}/>
                                    </motion.div>
                                )
                            })}


                        </div>
                    </div>
                </div>

    )
}