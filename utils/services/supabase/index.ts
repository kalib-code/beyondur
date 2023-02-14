/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../../database/client';

interface PublicUrl {
  publicUrl: string;
}

/**
 * This function returns a public URL to the file in the Supabase Storage bucket.
 * @param path The path to the file in the bucket.
 * @param collection The name of the bucket to look in.
 * @returns The public URL to the file.
 */

export const getPublicUrl = (path: string, collection: string) => {
  const { data: URL } = supabase.storage.from(collection).getPublicUrl(path) as PublicUrl | any;

  return URL.publicUrl;
};
