import {useMutation, useQueryClient} from "react-query";
import {supabase} from "../../../utils/database/client";
import {Json} from "../../../utils/types/database";

export interface ITestimony {
    id: number
    created_at: string | null
    isVideo: boolean | null
    rating: number | null
    name: string | null
    email: string | null
    tags: Json | null
    isHighlight: boolean | null
    isLike: boolean | null
    video_url: string | null
    video_thumbnail: string | null
    modified_at: string | null
    photo: string | null
    attach_images: Json | null
    spaces: string | null
    message: string | null
    isUserPermission: boolean | null
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
