import {supabase} from "../../utils/database/client";
import {useRouter} from "next/router";
import Image from "next/image";
import {useGetIdentity} from "@/hooks/auth";
import {getPublicUrl} from "../../utils/services/supabase";
import {useEffect, useState} from "react";

export interface IUser {
    user: any | null,
    profile: {
        id: string,
        updated_at: string | null,
        username: string | null,
        full_name: string | null,
        avatar_url: string | null,
        website: string | null
    } | null
}


export const NavBar = () => {
    const router = useRouter ()
    let [user, setUser] = useState<IUser> ()

    const { data, isFetching, isError } = useGetIdentity ()

    useEffect ( () => {
        if (data) {
            setUser ( data )
        }
    }, [data, isFetching, isError] )


    return (
        <>
            <div
                className="navbar container bg-base-100 m-auto bg-dotted-spacing-4  bg-dotted-gray-300">
                <div className="flex-1"
                     onClick={() => {
                         router.push ( '/' )
                     }}
                >
                    <a className="btn btn-ghost normal-case text-xl">Beyondur</a>
                </div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <div className="flex items-center">
                            <label tabIndex={0} className="btn btn-ghost btn-circle  avatar mr-2">
                                <div className="w-10 rounded-full">
                                    <Image src={getPublicUrl ( user?.profile?.avatar_url as string, 'avatars' )}
                                           width={100}
                                           height={100}
                                           alt={user?.profile?.full_name as string}/>
                                </div>
                            </label>
                            <div>
                                <p className="text-sm font-bold">{user?.profile?.full_name}</p>
                                <p className="text-sm">{user?.user?.email}</p>


                            </div>

                        </div>

                        <ul tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between"
                                   onClick={async () => {
                                       router.push ( '/profiles' )
                                   }}
                                >
                                    Profile
                                </a>
                            </li>
                            <li><a>Settings
                                <span className="badge">Soon</span>
                            </a></li>
                            <li><a onClick={async () => {
                                const { error } = await supabase.auth.signOut ()
                                if (error) console.log ( error )
                                router.push ( '/' )
                            }}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}
