import { GetServerSideProps, NextPage } from 'next'
import { IconFileUpload } from '@tabler/icons'
import Image from 'next/image'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { TUserInsert } from '../../utils/types'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { handleUploadSupaBase } from '../../hooks/apis/supabase'
import { getPublicUrl } from '../../utils/services/supabase'
import { NavBar } from '@/components/NavBar'
import { useGetIdentity, useUpsertUser } from '@/hooks/auth'

interface IUserRow extends TUserInsert {
  email: string | undefined
}

// omit email from TUserInsert
export type TUserInsertWithoutEmail = Omit<TUserInsert, 'email'>

const Profile: NextPage = () => {
  let [loading, setLoading] = useState(false)
  let [publicUrl, setPublicUrl] = useState('')
  const mutation = useUpsertUser()
  const { data: info, isFetching, isError } = useGetIdentity()

  useEffect(() => {
    if (info && !isFetching) {
      form.setValues({ full_name: info?.profile?.full_name })
      form.setValues({ email: info?.user.email })
      form.setValues({ avatar_url: info?.profile?.avatar_url })
      form.setValues({ id: info?.user.id })

      setPublicUrl(getPublicUrl(info?.profile?.avatar_url as string, 'avatars'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, isFetching, isError])

  const form = useForm<IUserRow>({
    initialValues: {
      id: '',
      avatar_url: '',
      full_name: '',
      email: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.full_name) errors.full_name = 'Full name is required'
      return errors
    },
  })

  const handleProfileSubmit = async (values: IUserRow) => {
    // omit email from values

    const others = Object.keys(values).filter(
      (key) => key !== 'email'
    ) as unknown as TUserInsertWithoutEmail

    setLoading(true)
    mutation.mutate(others)
    setLoading(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = async (e: any) => {
    const { url, data } = await handleUploadSupaBase(
      e,
      'avatars',
      info?.user?.id as string
    )
    if (url) {
      setPublicUrl(url)
    }
    form.setValues({ avatar_url: data?.path })
  }
  return (
    <div className=" mx-auto bg-dotted-spacing-4  bg-dotted-gray-300 ">
      <NavBar />
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <div className="card-body">
              <form
                onSubmit={form.onSubmit((values) =>
                  handleProfileSubmit(values)
                )}
              >
                <div className="form-control">
                  <label className="label"> Full Name</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input-bordered input-primary input w-full max-w-md"
                    {...form.getInputProps('full_name')}
                  />

                  {form.errors.space_name ? (
                    <p className="my-2 text-sm text-error">
                      {' '}
                      {form.errors.full_name}{' '}
                    </p>
                  ) : null}
                  <label className="label"> Email </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input-bordered input-primary input w-full max-w-md"
                    {...form.getInputProps('email')}
                  />
                  <div className="avatar my-5 items-center">
                    <div className="mr-2 w-16 rounded-full">
                      <Image
                        objectFit={'cover'}
                        width={200}
                        height={200}
                        src={publicUrl ? publicUrl : '/./logodefault.jpg'}
                        alt={info?.profile?.full_name as string}
                      />
                    </div>
                    <label className="btn-ghost btn-sm btn my-2 w-52">
                      <IconFileUpload size={20} />
                      <span className="text-base leading-normal">
                        Upload Profile{' '}
                      </span>
                      <input
                        onChange={async (event) => {
                          await handleUpload(event)
                        }}
                        type="file"
                        accept=" image/jpeg "
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <button
                  className={`btn-primary btn ${
                    loading ? `loading` : ''
                  } btn-wide`}
                  type="submit"
                >
                  {' '}
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    props: {
      session: session,
    },
  }
}

export default Profile
