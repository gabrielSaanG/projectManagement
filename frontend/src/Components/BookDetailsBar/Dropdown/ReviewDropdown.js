import useBookContext from "../../../Context/BookContext/BookContext";
import React, {useEffect, useState} from "react";
import {getAllReviews} from "../../../Services/Reviews/ReviewServices";
import {FaStar} from "react-icons/fa6";

export default function ReviewDropdown(){
    const {book} = useBookContext()
    const [reviews, setReviews] = useState(null)


    const colors = {
        orange: "#F17316",
        grey: "$6b7280"
    }

    const stars = Array(5).fill(0)

    useEffect(() => {
        const token = {
            bookToken: book.token
        }

        const fetchReviews = async() => {
            try{
                return await getAllReviews(token)

            } catch (e){
                console.log(e)
            }
        }
        if (reviews !== {}){
            fetchReviews().then(r => {setReviews(r)})
        }

    }, []);

    return (<div>
            {reviews ? <div className="p-4 flex flex-col gap-2">

                {reviews.map((item) => {
                    return (
                        <div className="my-4">
                            <h1 className="text-gray-500">{item.authorId}</h1>
                            <div className="flex gap-4">
                                <div className="flex">
                                    {stars.map((_, index) => {
                                        return (
                                            <FaStar
                                                key={index}
                                                size={24}
                                                color={(Math.round(item.rating)) > index ? colors.orange : colors.grey}
                                            />
                                        )
                                    })}
                                </div>
                                <h1 className="font-semibold">{item.title}</h1>

                            </div>
                            <div className="">
                                <p>{item.description}</p>
                            </div>
                        </div>
                    )
                })}

                </div>
                :

                <div><h1>Este livro não possui reviews.</h1></div>}
        </div>
    )
}
