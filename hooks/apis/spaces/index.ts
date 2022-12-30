import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query'
import {supabase} from "../../../utils/database/client";

import {TSpaceInsert, TSpaceRow} from "../../../utils/types";


export const useGetSpaces = ( initialData: TSpaceRow[], user: string ) => {
    const queryClient = useQueryClient ()
    return useQuery ( ['spaces'], async () => {
            const { data, error } = await supabase
                .from ( 'spaces' )
                .select ()
                .eq ( 'user_id', user )
            if (error) {
                throw new Error ( error.message )
            }
            return data
        }, {
            initialData : initialData,
            refetchOnWindowFocus : false,
            onSuccess : ( data ) => {
                queryClient.setQueryData ( ['spaces'], data )
            },
        }
    )


}

export const useCreateSpace = () => {
    const queryClient = useQueryClient ()
    return useMutation (
        async ( space: TSpaceInsert ) => {
            const { data, error } = await supabase
                .from ( 'spaces' )
                .insert ( space )
                .select ()
            if (error) {
                throw new Error ( error.message )
            }
            return data[0]
        },
        {
            onSuccess : () => {
                queryClient.invalidateQueries ( ['spaces'] )
            },
        }
    )
}

export const useGetSpace = ( initialData: TSpaceRow ) => {
    const queryClient = useQueryClient ()

    return useQuery ( ['space', initialData?.id], async () => {
            const { data, error } = await supabase
                .from ( 'spaces' )
                .select ()
                .eq ( 'id', initialData?.id )
            if (error) {
                throw new Error ( error.message )
            }
            return data[0] as TSpaceRow
        }, {
            initialData : initialData,
            refetchOnWindowFocus : false,
            onSuccess : ( data ) => {
                queryClient.setQueryData ( ['space', initialData?.id], data )
            },
        }
    )
}
