import Head from 'next/head'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'

export default function Home() {
    const session = useSession ()
    const supabase = useSupabaseClient ()
    
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className="container mx-auto w-full  max-w-lg">
                <p>Home page here </p>
            </div>
        </>
    )
}
