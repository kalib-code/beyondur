import {useForm} from '@mantine/form'
import {NextPage} from "next";
import React from "react";
import {supabase} from "../../utils/database/client";
import {useRouter} from "next/router";

interface FormValues {
    email: string
    password: string
}

function isEmail( email: string ) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test ( email );
}


const Signup: NextPage = () => {
    let [loading, setLoading] = React.useState ( false );
    const router = useRouter ()
    let [error, setError] = React.useState ( false );


    const form = useForm<FormValues> ( {
        initialValues : {
            email : '',
            password : '',
        },
        validate : ( values ) => {
            const errors: any = {};
            // validate email if string is email
            if (!values.email || !isEmail ( values.email )) {
                errors.email = 'Invalid email';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }

            return errors;
        }
    } )

    const handleLogin = async ( values: FormValues ) => {
        setLoading ( true )
        form.validate ();

        const { data, error } = await supabase.auth.signInWithPassword ( {
            email : values.email,
            password : values.password,
        } )
        
        if (error) {
            setError ( true )
            setLoading ( false )
        }
        if (data) {
            router.push ( '/dashboard' )
            setLoading ( false )
        }
    }


    return (
        <>
            <div
                className="grid content-center justify-center container mx-auto min-h-screen bg-base-100  bg-dotted-spacing-4 bg-dotted-gray-300">
                <div className=" flex-col ">
                    <div className="card w-96 shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">Login</h2>
                            {error && <div className="text-error text-lg">Invalid email or password</div>}
                            <form onSubmit={form.onSubmit ( ( values ) => handleLogin ( values ) )}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" className="input input-bordered"
                                           {...form.getInputProps ( 'email' )}/>
                                    {form.errors.email && (
                                        <label className="label text-sm text-error"> Please input valid email </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered"
                                           {...form.getInputProps ( 'password' )}/>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit"
                                            className={`btn btn-primary ${loading ? "loading" : ""} mb-4`}>Login
                                    </button>

                                    <button type="submit"
                                            onClick={() => router.push ( '/auth/signup' )}
                                            className={`btn btn-ghost`}>Signup
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
