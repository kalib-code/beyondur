import { videoUrl } from '../../utils/services/imagekit'
import { useMemo } from 'react'
import 'plyr-react/plyr.css'
import Plyr from 'plyr-react'

interface Props {
  url: string
}

export const VideoPlayer = (props: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const thumbnail = () => {
    const res = videoUrl(props.url)
    return res + '/ik-thumbnail.jpg'
  }

  const sources = useMemo(() => {
    return {
      source: {
        hideControls: false,
        clickToPlay: true,
        type: 'video',
        sources: [
          {
            src: videoUrl(props.url),
            type: 'video/webm',
          },
        ],
      }, // https://github.com/sampotts/plyr#the-source-setter
      options: {
        controls: ['play-large'],
        previewThumbnails: {
          enabled: true, // Enable preview thumbnails
          src: thumbnail, // imagekit url
        },
        //blankVideo : 'https://cdn.plyr.io/static/blank.mp4', // Used as a fallback for unsupported browsers (i.e. IE)
      }, // https://github.com/sampotts/plyr#options
    }
  }, [props.url, thumbnail])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Plyr {...sources} />
  )
}
