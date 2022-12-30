import {useUser} from "@supabase/auth-helpers-react";
import {NextPage} from "next";
import {IconFileUpload} from "@tabler/icons";
import Image from "next/image";


import {TUserInsert, TUserRow} from "../../utils/types";
import {supabase} from "../../utils/database/client";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {handleUploadSupaBase} from "../../hooks/apis/supabase";

interface IUserRow extends TUserInsert {
    email: string | undefined
}


const Profile: NextPage = () => {
    const user = useUser ()
    let [data, setData] = useState<TUserRow> ( {} as TUserRow )
    let [loading, setLoading] = useState ( false )
    let [publicUrl, setPublicUrl] = useState ( "" )
    useEffect ( () => {
        supabase
            .from ( "profiles" )
            .select ( "*" )
            .eq ( "id", user?.id )
            .single ().then ( ( { data, error } ) => {
            if (error) console.log ( error )
            setData ( data as TUserRow )

        } );
   

    }, [] )


    const form = useForm<IUserRow> ( {
        initialValues : {
            image_profile : '',
            full_name : data?.full_name || '',
            profile_id : user?.id,
            email : user?.email,
        }, validate : ( values ) => {
            const errors: Record<string, string> = {};
            if (!values.full_name) errors.full_name = "Full name is required";
            return errors;
        }
    } )

    const handleProfileSubmit = async ( values: TUserInsert ) => {
        setLoading ( true )
        const { error } = await supabase
            .from ( "profiles" )
            .insert ( [
                {
                    image_profile : values.image_profile,
                    full_name : values.full_name,
                    profile_id : values.profile_id,
                },
            ] )
        if (error) console.log ( error )
        setLoading ( false )
    }

    const handleUpload = async ( e: any ) => {
        const { url, data } = await handleUploadSupaBase ( e )
        if (url) {
            setPublicUrl ( url )
        }
        form.setValues ( { image_profile : data?.path } )
    }

    if (!user) return <div className="loading">loading...</div>

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={form.onSubmit ( ( values ) => handleProfileSubmit ( values ) )}>
                            <div className="form-control">
                                <label className="label"
                                > Full Name</label>
                                <input type="text" placeholder="Type here"
                                       className="input input-bordered input-primary w-full max-w-md"
                                       {...form.getInputProps ( 'full_name' )}
                                />

                                {form.errors.space_name ? (
                                    <p className="text-error text-sm my-2"> {form.errors.full_name} </p>
                                ) : null}
                                <label className="label"
                                > Email </label>
                                <input type="text" placeholder="Type here"
                                       className="input input-bordered input-primary w-full max-w-md"
                                       {...form.getInputProps ( 'email' )}
                                />
                                <div className="avatar my-5 items-center">
                                    <div className="w-16 rounded-full mr-2">
                                        <Image objectFit={"cover"} width={200} height={200}
                                               src={publicUrl ? publicUrl : '/./logodefault.jpg'}/>
                                    </div>
                                    <label
                                        className="btn btn-ghost btn-sm w-52 my-2">
                                        <IconFileUpload size={20}/>
                                        <span className="text-base leading-normal">Upload Profile </span>
                                        <input onChange={async ( event ) => {
                                            await handleUpload ( event )
                                        }} type='file' accept=" image/jpeg " className="hidden"/>
                                    </label>
                                </div>


                            </div>
                            <button className={`btn btn-primary ${loading ? `loading` : ''} btn-wide`}
                                    type="submit"> Save Profile
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
