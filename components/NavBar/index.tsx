import {supabase} from "../../utils/database/client";
import {useRouter} from "next/router";

export const NavBar = () => {
    const router = useRouter ()

    return (
        <>
            <div
                className="navbar container bg-base-100 m-auto bg-dotted-spacing-4  bg-dotted-gray-300">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Beyondur</a>
                </div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" alt={"people pic"}/>
                            </div>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between"
                                   onClick={async () => {
                                       router.push ( '/profiles' )
                                   }}
                                >
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
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
