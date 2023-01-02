import {GetServerSideProps, NextPage} from "next";
import {IconFileUpload} from "@tabler/icons";
import Image from "next/image";
import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'


import {TUserInsert, TUserRow} from "../../utils/types";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {handleUploadSupaBase} from "../../hooks/apis/supabase";
import {getPublicUrl} from "../../utils/services/supabase";
import {NavBar} from "@/components/NavBar";
import {useGetIdentity, useUpsertUser} from "@/hooks/auth";
import {AuthUser} from "@supabase/supabase-js";


interface IUserRow extends TUserInsert {
    email: string | undefined
}

interface IProps {
    session: AuthUser
}


const Profile: NextPage<IProps> = ( props ) => {
    const { session } = props
    let [data, setData] = useState<TUserRow> ( {} as TUserRow )
    let [loading, setLoading] = useState ( false )
    let [publicUrl, setPublicUrl] = useState ( "" )
    const mutation = useUpsertUser ()
    const { data : info } = useGetIdentity ()

    const form = useForm<IUserRow> ( {
        initialValues : {
            id : info?.user?.id as string,
            avatar_url : info?.profile?.avatar_url,
            full_name : info?.profile?.full_name,
            email : info?.user?.email,
        }, validate : ( values ) => {
            const errors: Record<string, string> = {};
            if (!values.full_name) errors.full_name = "Full name is required";
            return errors;
        }
    } )


    const handleProfileSubmit = async ( values: IUserRow ) => {
        const { email, ...others } = values
        setLoading ( true )
        await mutation.mutate ( others )
        setLoading ( false )
    }

    const handleUpload = async ( e: any ) => {
        const { url, data } = await handleUploadSupaBase ( e, "avatars", info?.user?.id as string )
        if (url) {
            setPublicUrl ( url )
        }
        form.setValues ( { avatar_url : data?.path } )
    }

    useEffect ( () => {
        setPublicUrl ( getPublicUrl ( info?.profile?.avatar_url as string, 'avatars' ) )
    }, [] )

    return (
        <div className=" mx-auto bg-dotted-spacing-4  bg-dotted-gray-300 ">
            <NavBar/>
            <div className="hero min-h-screen">
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
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
    const supabase = createServerSupabaseClient ( ctx )
    const {
        data : { session },
    } = await supabase.auth.getSession ()

    return {
        props : {
            session : session

        },
    }
}

export default Profile
