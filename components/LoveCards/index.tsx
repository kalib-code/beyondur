import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { getPublicUrl } from '../../utils/services/supabase'
import { Rating } from '@/components/Rating'
import { TTestimoniesRow } from '../../utils/types'
import Image from 'next/image'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export const LoveCards = (props: TTestimoniesRow) => {
  return (
    <>
      <div className="card mb-5 w-auto break-inside-avoid bg-base-100 shadow-md  hover:shadow-2xl ">
        <div className="card-body">
          <div>
            <div className="my-2 flex items-center">
              <div className="avatar mr-2  ">
                <div className="mask mask-squircle w-10">
                  <Image
                    src={getPublicUrl(props.photo as string, 'images')}
                    width={200}
                    height={200}
                    objectFit={'cover'}
                    alt={props.name as string}
                  />
                </div>
              </div>
              <div className="items-center ">
                <p className="text-md font-bold text-accent">{props.name}</p>
                {/*<p className="text-accent text-sm ">@topG</p>*/}
              </div>
            </div>
            {props.attach_images ? (
              <Image
                className="my-5 rounded-lg"
                width={300}
                height={400}
                src={getPublicUrl(props.attach_images as string, 'images')}
                alt={props.name as string}
              />
            ) : null}
            <p className="text-sm">{props.message} </p>
          </div>
          <div className="rating rating-xs">
            <Rating rating={props.rating as number} />
          </div>
          <p className="font-base text-sm text-accent">
            {timeAgo.format(Date.parse(props.created_at as string), 'twitter')}
          </p>
        </div>
      </div>
    </>
  )
}
