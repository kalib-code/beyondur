import { useForm } from '@mantine/form'
import { NextPage } from 'next'
import React from 'react'
import { supabase } from '../../utils/database/client'
import { useRouter } from 'next/router'

interface FormValues {
  email: string
  password: string
  confirmPassword: string
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const Signup: NextPage = () => {
  let [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {}
      // validate email if string is email
      if (!values.email || !isEmail(values.email)) {
        errors.email = 'Invalid email'
      }
      if (!values.password) {
        errors.password = 'Password is required'
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
      return errors
    },
  })

  const handleSignUp = async (values: FormValues) => {
    setLoading(true)
    form.validate()

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    })
    if (error) {
      console.log(error)
    }
    if (data) {
      router.push('/auth/email-confirmation')
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container mx-auto grid min-h-screen content-center justify-center bg-base-100  bg-dotted-spacing-4 bg-dotted-gray-300">
        <div className=" flex-col ">
          <div className="card w-96 bg-base-100 shadow-2xl">
            <div className="card-body">
              <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input-bordered input"
                    {...form.getInputProps('email')}
                  />
                  {form.errors.email && (
                    <label className="label text-sm text-error">
                      {' '}
                      Please input valid email{' '}
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input-bordered input"
                    {...form.getInputProps('password')}
                  />

                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>

                  <input
                    type="password"
                    placeholder="password"
                    className="input-bordered input"
                    {...form.getInputProps('confirmPassword')}
                  />
                  {form.errors.confirmPassword && (
                    <label className="label text-sm text-error">
                      {' '}
                      {form.errors.confirmPassword}
                    </label>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className={`btn-primary btn ${
                      loading ? 'loading' : ''
                    } mb-4`}
                  >
                    SignUp
                  </button>

                  <button type="button" className={`btn-ghost btn`}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
