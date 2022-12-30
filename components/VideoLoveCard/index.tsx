import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "plyr-react/plyr.css"
import {VideoPlayer} from "@/components/VideoPlayer";
import {Rating} from "@/components/Rating";
import {TTestimoniesRow} from "../../utils/types";


TimeAgo.addLocale ( en )
const timeAgo = new TimeAgo ( 'en-US' );


export const LoveCardsVideo = ( props: TTestimoniesRow ) => {


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

                        </div>

                        {
                            // @ts-ignore'
                            <VideoPlayer url={props.video_url}/>
                        }
                    </div>
                    <Rating rating={props?.rating as number}/>
                    <p className="text-accent text-sm font-base">{timeAgo.format ( Date.parse ( props.created_at as string ), "twitter" )}</p>

                </div>
            </div>
        </>
    )
}
