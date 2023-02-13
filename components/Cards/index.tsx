import Image from 'next/image'
import { useRouter } from 'next/router'
import { getPublicUrl } from '../../utils/services/supabase'
import { TSpaceRow } from '../../utils/types'

interface Props {
  data: TSpaceRow
}

export const Cards = ({ data }: Props) => {
  const router = useRouter()
  const goTo = () => {
    router.push('/[id]', `/${data.name}`)
  }

  let Url = getPublicUrl(data.logo_image as string, 'images')

  return (
    <>
      <div
        onClick={() => {
          goTo()
        }}
        className="col-span-1 flex rounded-md border border-gray-200 shadow-sm hover:shadow-md dark:border-gray-600"
      >
        <Image
          className="inline-flex  h-24 cursor-pointer items-center justify-center bg-white "
          objectFit={'cover'}
          objectPosition={'fill'}
          width={100}
          height={100}
          src={Url}
          alt="Movie"
        />
        <div className="flex flex-1 items-center justify-between  rounded-r-md border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 ">
          <div className="flex-1 cursor-pointer p-4 ">
            <div className="test-md font-medium text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-white">
              {data.title}
            </div>
            <div className="grid grid-cols-2">
              <p className="text-sm text-gray-500 dark:text-gray-100">
                Video: 0{' '}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-100">
                Text: 0{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
