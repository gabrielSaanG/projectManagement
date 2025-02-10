import ImageComponent from "../ImageComponent/ImageComponent";
import {FaStar} from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

const BookCardSkeleton = ({cards}) => {
    return (
        Array(cards).fill(0).map((item, i) => <div className="bg-white rounded-2xl text-sm pb-4 pt-4 px-4 mr-4 mt-4
        min-w-[160px] h-[300px] cursor-pointer hover:scale-105 transition-transform" key={i}>
            <div className="flex items-center justify-center ">
                <div className="max-w-[108px] max-h-[142px]">
                    <Skeleton width={108} height={142}/>
                </div>

            </div>

            <div className="flex flex-col gap-1 mt-3 text-gray-800 ">
                <div className="h-[40px] overflow-hidden overflow-ellipsis font-semibold">
                    <h1><Skeleton/></h1>
                </div>
                <div className="flex flex-col">
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                </div>
                <div>
                    <p className="flex items-center gap-1"><Skeleton/></p>
                </div>
            </div>
        </div>)

    )
}

export default BookCardSkeleton