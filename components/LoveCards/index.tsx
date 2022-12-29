import {Json} from "../../utils/types/database";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {getPublicUrl} from "../../utils/services/supabase";
import {Rating} from "@/components/Rating";

interface Props {
    id: number
    created_at: string
    isVideo: boolean | null
    rating: number | null
    name: string | null
    email: string | null
    tags: Json | null
    isHighlight: boolean | null
    isLike: boolean | null
    video_url: string
    video_thumbnail: string | null
    modified_at: string | null
    photo: string | null
    attach_images: Json | null
    message: string | null
    isUserPermission: boolean | null
    spaces: string | null
}


TimeAgo.addLocale ( en )
const timeAgo = new TimeAgo ( 'en-US' );

export const LoveCards = ( props: Props ) => {


    return (
        <>
            <div className="card w-auto bg-base-100 shadow-md hover:shadow-2xl mb-5  break-inside-avoid ">
                <div className="card-body">
                    <div>
                        <div className="flex items-center my-2">
                            <div className="avatar mr-2  ">
                                <div className="w-10 mask mask-squircle">
                                    <img src={getPublicUrl ( props.photo as string )} alt={props.name as string}/>
                                </div>
                            </div>
                            <div className="items-center ">
                                <p className="text-accent text-md font-bold">{props.name}</p>
                                {/*<p className="text-accent text-sm ">@topG</p>*/}
                            </div>
                        </div>
                        {props.attach_images ?
                            <img className="rounded-lg my-5" src={getPublicUrl ( props.attach_images as string )}
                                 alt={props.name as string}/> : null}
                        <p className="text-sm">{props.message} </p>
                    </div>
                    <div className="rating rating-xs">
                        <Rating rating={props.rating as number}/>
                    </div>
                    <p className="text-accent text-sm font-base">{timeAgo.format ( Date.parse ( props.created_at ), "twitter" )}</p>

                </div>
            </div>
        </>
    )
}
