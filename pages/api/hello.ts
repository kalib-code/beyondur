// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../utils/types/database';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const { id } = req.query;

  console.log(id);

  const { data } = await supabase.from('profile').select().eq('id', id).single();

  console.log(data);

  res.status(200).json(data);
};
