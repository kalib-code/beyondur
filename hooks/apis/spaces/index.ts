import {useMutation, useQuery, useQueryClient,} from 'react-query'
import {supabase} from "../../../utils/database/client";
import {Json} from "../../../utils/types/database";

interface Space {
    id: string
    created_at: string
    modified_at: string
    name: string
    title: string
    message: string
    questions: Json
    logo_image: string
    isVideoOnly: boolean
    isUserConsent: boolean
    isRating: boolean
    links: Json[]
}


export const useGetSpaces = ( initialData: undefined ) => {
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
        async ( space: any ) => {
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

export const useGetSpace = ( id: string ) => {
    const queryClient = useQueryClient ()

    return useQuery ( ['space', id], async () => {
            const { data, error } = await supabase
                .from ( 'spaces' )
                .select ()
                .eq ( 'id', id )
            if (error) {
                throw new Error ( error.message )
            }
            return data[0] as Space
        }, {
            refetchOnWindowFocus : false,
            onSuccess : ( data ) => {
                queryClient.setQueryData ( ['space', id], data )
            },
        }
    )
}
