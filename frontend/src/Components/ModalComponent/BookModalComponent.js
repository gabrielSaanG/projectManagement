import ImageComponent from "../ImageComponent/ImageComponent";
import bookImg from "../../Images/bookImg.png"


export default function BookModalComponent({image, title, author, date, rating}){
    return (
        <div className="bg-white rounded-2xl text-sm pt-4 mt-4 px-4 mx-4    w-auto h-[280px] cursor-pointer">
            <div className="flex items-center justify-center">
                <ImageComponent imageSource={image}/>   
            </div>

            <div className="flex flex-col gap-1 mt-3 text-gray-800">
                <div>
                    <h1>{title}</h1>
                </div>
                <div className="flex gap-2">
                    <p>{author},</p>
                    <p> {date}</p>
                </div>
                <div>
                    <p className="flex">{rating}<span className="text-gray-500">/5</span></p>
                </div>
            </div>


        </div>
    )
}