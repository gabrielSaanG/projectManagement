import ImageComponent from "../ImageComponent/ImageComponent";
import {FaStar} from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import {IoShareSocialOutline, IoStarOutline} from "react-icons/io5";
import {SlNote} from "react-icons/sl";
import React from "react";

const ImageCardSkeleton = () => {
    return (
        <div className="w-max">
            <Skeleton width={130} height={172}/>
        </div>

    )
}

export default ImageCardSkeleton