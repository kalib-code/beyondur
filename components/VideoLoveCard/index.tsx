import {Json} from "../../utils/types/database";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "plyr-react/plyr.css"
import {VideoPlayer} from "@/components/VideoPlayer";
import {Rating} from "@/components/Rating";


interface Props {
    id: number
    created_at: string
    isVideo: boolean
    rating: number
    name: string
    email: string
    tags: Json
    isHighlight: boolean
    isLike: boolean
    video_url: string
    video_thumbnail: string
    modified_at: string
    photo: string
    attach_images: Json
    message: string
    isUserPermission: boolean
    spaces: string
}

const VideoRating = ( rating: number ) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push ( <input type="radio" name="rating-1" className="mask mask-star" checked/> )
        } else {
            stars.push ( <input type="radio" name="rating-1" className="mask mask-star"/> )
        }
    }
    return (
        <div>
            {stars}
        </div>
    )
};

TimeAgo.addLocale ( en )
const timeAgo = new TimeAgo ( 'en-US' );


export const LoveCardsVideo = ( props: Props ) => {


    return (
        <>
            <div className="card w-auto bg-base-100 shadow-md hover:shadow-2xl mb-5 break-inside-avoid">
                <div className="card-body">

                    <div>
                        <div className="flex items-center my-2 ">
                            <p className="text-accent text-md font-bold">{props.name}</p>
                            {/*<p className="text-accent text-sm ">@topG</p>*/}

                        </div>
                        <div className="rating rating-xs">
                            <Rating rating={props.rating}/>
                        </div>

                        {
                            // @ts-ignore'
                            <VideoPlayer url={props.video_url}/>
                        }
                    </div>
                    <p className="text-accent text-sm font-base">{timeAgo.format ( Date.parse ( props.created_at ), "twitter" )}</p>

                </div>
            </div>
        </>
    )
}
