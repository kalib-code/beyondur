import {useMutation, useQuery, useQueryClient,} from 'react-query'
import {supabase} from "../../../utils/database/client";


export const useGetSpaces = () => {
    const queryClient = useQueryClient ()
    return useQuery ( ['spaces'], async () => {
            const { data, error } = await supabase
                .from ( 'spaces' )
                .select ()
            if (error) {
                throw new Error ( error.message )
            }
            return data
        }, {
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
        async ( space: any ) => {
            const { data, error } = await supabase
                .from ( 'spaces' )
                .insert ( space )
            if (error) {
                throw new Error ( error.message )
            }
            return data
        },
        {
            onSuccess : () => {
                queryClient.invalidateQueries ( ['spaces'] )
            },
        }
    )
}
