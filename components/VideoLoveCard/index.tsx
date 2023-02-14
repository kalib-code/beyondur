import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import 'plyr-react/plyr.css';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Rating } from '@/components/Rating';
import { TTestimoniesRow } from '../../utils/types';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export const LoveCardsVideo = (props: TTestimoniesRow) => {
  return (
    <>
      <div className="card mb-5 w-auto break-inside-avoid bg-base-100 shadow-md hover:shadow-2xl">
        <div className="card-body">
          <div>
            <div className="my-2 flex items-center ">
              <p className="text-md font-bold text-accent">{props.name}</p>
              {/*<p className="text-accent text-sm ">@topG</p>*/}
            </div>
            <div className="rating rating-xs"></div>

            {<VideoPlayer url={props.video_url as string} />}
          </div>
          <Rating rating={props?.rating as number} />
          <p className="font-base text-sm text-accent">
            {timeAgo.format(Date.parse(props.created_at as string), 'twitter')}
          </p>
        </div>
      </div>
    </>
  );
};
