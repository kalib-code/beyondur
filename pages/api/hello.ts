// Creating a new supabase server client object (e.g. in API route):
import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import type {NextApiRequest, NextApiResponse} from 'next'
import type {Database} from '../../utils/types/database'

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    const supabase = createServerSupabaseClient<Database> ( {
        req,
        res,
    } )

    const { id } = req.query
    let body

    const { data, error } = await supabase
        .from ( "profile" )
        .select ()
        .eq ( "profiles", id )
        .single ()

    res.status ( 200 ).json ( data )


}
