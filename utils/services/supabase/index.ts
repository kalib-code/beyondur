import {supabase} from "../../database/client";


interface PublicUrl {
    publicUrl: string
}

export const getPublicUrl = ( path: string, collection: string ) => {
    const { data : URL } = supabase
        .storage
        .from ( collection )
        .getPublicUrl ( path ) as PublicUrl | any

    return URL.publicUrl
}


