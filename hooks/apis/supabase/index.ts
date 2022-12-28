import {supabase} from "../../../utils/database/client";
import {getPublicUrl} from "../../../utils/services/supabase";

export const handleUploadSupaBase = async ( e: any ) => {
    const file = e.target.files[0]
    const { data, error } = await supabase
        .storage
        .from ( 'images' )
        .upload ( `public/${file.name}`, file, {
            cacheControl : '3600',
            upsert : true,
        } ) as string | any
    if (error) {
        console.log ( error )
    }
    return {
        url : getPublicUrl ( data?.path ),
        data : data
    }

}
