import Head from 'next/head'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'

export default function Test() {
    const session = useSession ()
    const supabase = useSupabaseClient ()

    return (
        <>
            <Head>
                <title>Test</title>
            </Head>
            <main className="container mx-auto w-full  max-w-lg">
                <p>Test page here </p>
            </main>
        </>
    )
}
