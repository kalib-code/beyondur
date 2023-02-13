/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../../../utils/database/client'
import { getPublicUrl } from '../../../utils/services/supabase'

export const handleUploadSupaBase = async (
  e: any,
  collection: string,
  path: string
) => {
  const file = e.target.files[0]
  const { data, error } = (await supabase.storage
    .from(collection)
    .upload(`${path}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: true,
    })) as string | any
  if (error) {
    // TODO: create a error notification if upload not successfully
    console.log(error)
  }
  return {
    url: getPublicUrl(data?.path, collection),
    data: data,
  }
}
