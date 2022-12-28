// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
// @ts-ignore


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // upload video to s3 bucket
    // save video URL to database
    res.status ( 200 ).json ( { name : 'John Doe' } )
}
