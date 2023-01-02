import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TUserInsert, TUserUpdate} from "../../utils/types";
import {supabase} from "../../utils/database/client";

export const useUpsertUser = () => {
    const queryClient = useQueryClient ()
    return useMutation (
        async ( data: TUserUpdate ) => {
            const { data : response, error } = await supabase
                .from ( 'profiles' )
                .upsert ( data as TUserInsert )
                .select ()
            return response
        }, {
            onSuccess : () => {
                queryClient.invalidateQueries ( ['GetIdentity'] )
            }

        }
    )
}
