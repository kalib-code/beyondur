import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../../../utils/database/client";
import {TTestimoniesInsert, TTestimoniesRow} from "../../../utils/types";


export const useCreateTestimony = () => {
    const queryClient = useQueryClient ()
    return useMutation (
        async ( testimony: TTestimoniesInsert ) => {
            const { data, error } = await supabase
                .from ( 'testimonials' )
                .insert ( testimony )
                .select ()
            if (error) {
                throw new Error ( error.message )
            }
            return data
        },
        {
            onSuccess : () => {
                queryClient.invalidateQueries ( ['testimonies'] )
            },
        }
    )
}

export const useGetTestimonies = ( id: string, initialData: TTestimoniesRow[] ) => {
    const queryClient = useQueryClient ()
    const { data } = useQuery ( ['testimonies'], async () => {
            const { data : data2, error : error2 } = await supabase
                .from ( 'testimonials' )
                .select ()
                .eq ( 'spaces', id )
                .order ( 'id', { ascending : false } )
            return data2
        }, {
            //@ts-ignore
            initialData : initialData,
            refetchOnWindowFocus : false,
            onSuccess : ( data ) => {
                queryClient.setQueryData ( ['testimonies'], data )
            },
        }
    )
    return data as TTestimoniesRow[]

}
