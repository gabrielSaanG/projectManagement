import ImageComponent from "../ImageComponent/ImageComponent";
import { FaStar } from "react-icons/fa6";


export default function BookSearchModalComponent({imageURL, title, author, date, rating, token}){

    const redirect = () => {
        window.location.href = `/book_page/${token}`
    }

    return (
        <li
            className="bg-white flex text-sm p-4
            cursor-pointer hover:bg-gray-50 transition-all"
            onClick={redirect}>
            <div className="h-fit w-fit">
                <div className="max-w-[108px] max-h-[142px] w-20">
                    <ImageComponent imageSource={imageURL}/>
                </div>

            </div>

            <div className="flex gap-1 mt-3 ml-4 flex-col text-gray-800 ">
                <div className="font-semibold w-52">
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