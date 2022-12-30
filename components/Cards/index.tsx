import Image from "next/image";
import {useRouter} from "next/router";
import {getPublicUrl} from "../../utils/services/supabase";
import {TSpaceRow} from "../../utils/types";

interface Props {
    data: TSpaceRow
}

export const Cards = ( { data }: Props ) => {
    const router = useRouter ()
    const goTo = () => {
        router.push ( '/[id]', `/${data.name}` )
    }

    let Url = getPublicUrl ( data.logo_image as string )

    return (
        <>
            <div onClick={() => {
                goTo ()
            }}
                 className="col-span-1 flex shadow-sm rounded-md border border-gray-200 dark:border-gray-600 hover:shadow-md">
                <Image className="bg-white  inline-flex items-center justify-center h-24 cursor-pointer "
                       objectFit={"cover"} objectPosition={"fill"} width={100} height={100} src={Url} alt="Movie"/>
                <div
                    className="flex-1 flex items-center justify-between  bg-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-r-md border-l border-gray-200 dark:border-gray-800 ">
                    <div className="flex-1 p-4 cursor-pointer ">
                        <div
                            className="text-gray-600 dark:text-gray-100 test-md font-medium hover:text-gray-800 dark:hover:text-white">
                            {data.title}
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="text-gray-500 dark:text-gray-100 text-sm">Video: 0 </p>
                            <p className="text-gray-500 dark:text-gray-100 text-sm">Text: 0 </p>

                        </div>
                    </div>
                    {/*<div className="flex-shrink-0 pr-2">*/}
                    {/*    <div className="relative flex justify-end items-center">*/}
                    {/*        <div className="relative inline-block text-left">*/}
                    {/*            <div>*/}
                    {/*                <button className="rounded-full flex text-sm text-white focus:outline-none focus:bg-base-100 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white z-10" type="button">*/}
                    {/*                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                    {/*                         stroke="currentColor"*/}
                    {/*                         className="h-5 w-5 text-gray-400 hover:text-base-100" aria-hidden="true">*/}
                    {/*                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                    {/*                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>*/}
                    {/*                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                    {/*                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>*/}
                    {/*                    </svg>*/}
                    {/*                </button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    )
}
