import '../styles/globals.css'
import {useState} from "react";
import {QueryClient, QueryClientProvider,} from 'react-query'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import {AppProps} from "next/app";


const queryClient = new QueryClient ( {
    defaultOptions : {
        queries : {
            refetchOnWindowFocus : false,
        },
    }
} )

function MyApp( { Component, pageProps }: AppProps ) {
    const [supabase] = useState ( () => createBrowserSupabaseClient () )

    return (
        <QueryClientProvider client={queryClient}>
            <SessionContextProvider supabaseClient={supabase}>
                <Component {...pageProps} />
            </SessionContextProvider>
        </QueryClientProvider>
    )
}

export default MyApp
