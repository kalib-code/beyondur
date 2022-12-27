import {supabase} from "../../database/client";


interface PublicUrl {
    publicUrl: string
}

export const getPublicUrl =  (path: string) => {
    const { data:URL } =  supabase
        .storage
        .from ( 'images' )
        .getPublicUrl ( path ) as PublicUrl | any

    return URL.publicUrl

}
