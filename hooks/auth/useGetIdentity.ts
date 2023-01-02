import {useQuery, useQueryClient} from "@tanstack/react-query";

import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {AuthUser} from "@supabase/supabase-js";
import {IUser} from "@/components/NavBar";


export const useGetIdentity = () => {
    const user = useUser () as AuthUser
    const supabaseClient = useSupabaseClient ()

    const queryClient = useQueryClient ()
    return useQuery ( ['GetIdentity'], async () => {

        const { data : session, error } = await supabaseClient.auth.getUser ()
        const { user } = session
        const { data } = await supabaseClient
            .from ( 'profiles' )
            .select ()
            .eq ( 'id', user?.id )
            .single ()
        return {
            user,
            profile : data
        } as IUser
    }, {
        refetchOnWindowFocus : true,
        onSuccess : ( data ) => {
            queryClient.setQueryData ( ['GetIdentity'], data )
        },
        refetchOnMount : true,
        refetchOnReconnect : true
    } )
}
