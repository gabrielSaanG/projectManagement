import ImageComponent from "../ImageComponent/ImageComponent";
// import {postBook} from "../../Services/Book/BookServices";
import { FaStar } from "react-icons/fa6";


export default function BookModalComponent({imageURL, title, author, date, rating, token}){

    const redirect = () => {
        window.location.href = `/book_page/${token}`
    }

    return (
        <div className="bg-white rounded-2xl text-sm pb-4 pt-4 px-4 mr-4 mt-4
         min-w-[160px] h-[300px] cursor-pointer hover:scale-105 transition-transform" onClick={redirect}>
            <div className="flex items-center justify-center ">
                <div className="max-w-[108px] max-h-[142px]">
                    <ImageComponent imageSource={imageURL}/>
                </div>

            </div>

            <div className="flex flex-col gap-1 mt-3 text-gray-800 ">
                <div className="h-[40px] overflow-hidden overflow-ellipsis font-semibold">
                    <h1>{title}</h1>
                </div>
                <div className="flex flex-col">
                    <p>{author},</p>
                    <p> {date}</p>
                </div>
                <div>
                    <p className="flex items-center gap-1">{rating}<span className="text-gray-500">/5</span><FaStar className="text-orange-500"/></p>
                </div>
            </div>


        </div>
    )
}