import {videoUrl} from "../../utils/services/imagekit";
import {useMemo} from "react";
import Plyr from "plyr-react"
import "plyr-react/plyr.css"


interface Props {
    url: string
}


export const VideoPlayer = ( props: Props ) => {
    const thumbnail = ( url: string ) => {
        const res = videoUrl ( props.url )
        return res + "/ik-thumbnail.jpg"

    }

    const sources = useMemo ( () => {
        return {
            source : {
                hideControls : false,
                clickToPlay : true,
                type : 'video',
                previewThumbnails : {
                    enabled : true, // Enable preview thumbnails
                    src : thumbnail, // imagekit url
                },
                sources : [{
                    src : videoUrl ( props.url ),
                    type : 'video/webm',
                }
                ]
            }, // https://github.com/sampotts/plyr#the-source-setter
            options : undefined, // https://github.com/sampotts/plyr#options
        };
    }, [props.url] );


    return (
        //@ts-ignore
        <Plyr {...sources}/>
    )

}
