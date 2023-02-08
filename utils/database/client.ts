import {Database} from '../types/database'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'


export const supabase = createBrowserSupabaseClient<Database> ()

