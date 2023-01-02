import {useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../../utils/database/client";
import {useUser} from "@supabase/auth-helpers-react";
import {AuthUser} from "@supabase/supabase-js";


export const useGetIdentity = () => {
    const user = useUser () as AuthUser

    const queryClient = useQueryClient ()
    return useQuery ( ['GetIdentity'], async () => {
        const { data } = await supabase
            .from ( 'profiles' )
            .select ()
            .eq ( 'id', user?.id )
            .single ()

        const session = await supabase.auth.getUser ()

        return {
            user,
            profile : data
        }
    }, {
        refetchOnWindowFocus : true,
        onSuccess : ( data ) => {
            queryClient.setQueryData ( ['GetIdentity'], data )
        },
        refetchOnMount : true,
        refetchOnReconnect : true
    } )
}
