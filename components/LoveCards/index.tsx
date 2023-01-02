import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {getPublicUrl} from "../../utils/services/supabase";
import {Rating} from "@/components/Rating";
import {TTestimoniesRow} from "../../utils/types";


TimeAgo.addLocale ( en )
const timeAgo = new TimeAgo ( 'en-US' );

export const LoveCards = ( props: TTestimoniesRow ) => {


    return (
        <>
            <div className="card w-auto bg-base-100 shadow-md hover:shadow-2xl mb-5  break-inside-avoid ">
                <div className="card-body">
                    <div>
                        <div className="flex items-center my-2">
                            <div className="avatar mr-2  ">
                                <div className="w-10 mask mask-squircle">
                                    <img src={getPublicUrl ( props.photo as string, 'images' )}
                                         alt={props.name as string}/>
                                </div>
                            </div>
                            <div className="items-center ">
                                <p className="text-accent text-md font-bold">{props.name}</p>
                                {/*<p className="text-accent text-sm ">@topG</p>*/}
                            </div>
                        </div>
                        {props.attach_images ?
                            <img className="rounded-lg my-5"
                                 src={getPublicUrl ( props.attach_images as string, 'images' )}
                                 alt={props.name as string}/> : null}
                        <p className="text-sm">{props.message} </p>
                    </div>
                    <div className="rating rating-xs">
                        <Rating rating={props.rating as number}/>
                    </div>
                    <p className="text-accent text-sm font-base">{timeAgo.format ( Date.parse ( props.created_at as string ), "twitter" )}</p>

                </div>
            </div>
        </>
    )
}
