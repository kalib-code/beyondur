import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../../utils/database/client'

import { TSpaceInsert, TSpaceRow } from '../../../utils/types'

export const useCreateSpace = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (space: TSpaceInsert) => {
      const { data, error } = await supabase
        .from('spaces')
        .insert(space)
        .select()
      if (error) {
        throw new Error(error.message)
      }
      return data[0]
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['spaces'])
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['spaces'])
      },
    }
  )
}

export const useGetSpace = (initialData: TSpaceRow[], user: string) => {
  const queryClient = useQueryClient()

  return useQuery(
    ['space', initialData],
    async () => {
      const { data: spaces, error } = await supabase
        .from('spaces')
        .select()
        .eq('user_id', user)
      if (error) {
        throw new Error(error.message)
      }
      return spaces as TSpaceRow[]
    },
    {
      initialData: initialData,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(['space', data], data)
      },
    }
  )
}
