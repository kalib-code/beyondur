import {useMutation, useQuery, useQueryClient} from "react-query";
import {supabase} from "../../../utils/database/client";
import {Json} from "../../../utils/types/database";

export interface ITestimony {
    id: number
    created_at: string
    isVideo: boolean
    rating: number
    name: string
    email: string
    tags: Json
    isHighlight: boolean
    isLike: boolean
    video_url: string
    video_thumbnail: string
    modified_at: string
    photo: string
    attach_images: Json
    spaces: string
    message: string
    isUserPermission: boolean
}


export const useCreateTestimony = () => {
    const queryClient = useQueryClient ()
    return useMutation (
        async ( testimony: ITestimony ) => {
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

export const useGetTestimonies = ( id: string, initialData: ITestimony[] ) => {
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
    return data as ITestimony[]

}
