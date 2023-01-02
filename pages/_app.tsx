import '../styles/globals.css'
import {useState} from "react";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {Session, SessionContextProvider} from '@supabase/auth-helpers-react'
import {AppProps} from "next/app";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


const queryClient = new QueryClient ( {
    defaultOptions : {
        queries : {
            refetchOnReconnect : true,
            retryOnMount : true
        },
    }
} )

function MyApp( { Component, pageProps }: AppProps<{
    initialSession: Session
}> ) {
    const [supabase] = useState ( () => createBrowserSupabaseClient () )

    return (
        <QueryClientProvider client={queryClient}>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <Component {...pageProps} />
            </SessionContextProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default MyApp
