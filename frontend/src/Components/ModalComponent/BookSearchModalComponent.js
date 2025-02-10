import ImageComponent from "../ImageComponent/ImageComponent";
import { FaStar } from "react-icons/fa6";


export default function BookSearchModalComponent({imageURL, title, author, date, rating, token}){

    const redirect = () => {
        window.location.href = `/book_page/${token}`
    }

    return (
        <li
            className="bg-white rounded-2xl flex text-sm pb-4 pt-4 px-4 mr-4 mt-4
            cursor-pointer hover:scale-105 transition-all absolute h-max"
            onClick={redirect}>
            <div className="flex">
                <div className="max-w-[108px] max-h-[142px]">
                    <ImageComponent imageSource={imageURL}/>
                </div>

            </div>

            <div className="flex gap-1 mt-3 flex-col text-gray-800 ">
                <div className="overflow-hidden overflow-ellipsis font-semibold">
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


        </li>
    )
}