import { GetServerSideProps, NextPage } from 'next'
import { NavBar } from '@/components/NavBar'
import { AiOutlinePlus } from 'react-icons/ai'
import { Cards } from '@/components/Cards'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  IconCircleMinus,
  IconFileUpload,
  IconGripVertical,
  IconInfoSquare,
  IconPlus,
} from '@tabler/icons'
import { ReorderPayload } from '@mantine/form/lib/types'
import { useCreateSpace, useGetSpace } from '@/hooks/apis'
import { handleUploadSupaBase } from '@/hooks/apis/supabase'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { TSpaceRow } from '../../utils/types'
import Image from 'next/image'
import { supabase } from '../../utils/database/client'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialSession: any
  user: string
  spaces: TSpaceRow[]
}

const checkIfValidURLSlug = (str: string) => {
  const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g
  return regexExp.test(str)
}

interface FormValues {
  questions: {
    question: string
  }[]
  space_name: string
  header_title: string
  custom_message: string
  logo: string
  user_id: string
}

const Dashboard: NextPage<Props> = (props) => {
  const { user, spaces } = props
  let [isOpen, setIsOpen] = useState(false)
  let [publicUrl, setPublicUrl] = useState(null)
  let [loading, setLoading] = useState(false)
  const { data } = useGetSpace(spaces, user)

  const mutation = useCreateSpace()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const form = useForm<FormValues>({
    initialValues: {
      questions: [{ question: '' }],
      space_name: '',
      header_title: '',
      custom_message: '',
      logo: '  ',
      user_id: user,
    },
    validate: (values) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {}
      if (!values.space_name) {
        errors.space_name = 'Space name is required'
      }
      if (!checkIfValidURLSlug(values.space_name)) {
        errors.space_name = 'Invalid space name should be a-z0-9'
      }
      if (!values.header_title) {
        errors.header_title = 'Header title is required'
      }
      if (!values.custom_message) {
        errors.custom_message = 'Custom message is required'
      }
      return errors
    },
  })

  useEffect(() => {
    // search if space name is already taken
    if (form.values.space_name) {
      supabase
        .from('spaces')
        .select('name')
        .eq('name', form.values.space_name)
        .then(({ data, error }) => {
          if (data) {
            console.log(data)
            if (data.length > 0) {
              form.setFieldError('space_name', 'Space name is already taken')
            }
          }
          if (error) {
            console.log(error)
          }
        })
    }
  }, [form])

  const handleOnSubmit = async (values: FormValues) => {
    setLoading(true)
    form.validate()
    const params = {
      name: values.space_name,
      title: values.header_title,
      message: values.custom_message,
      questions: values.questions,
      logo_image: values.logo,
      isVideoOnly: false,
      isUserConsent: false,
      isRating: false,
      links: [],
      user_id: values.user_id,
    }

    mutation.mutate(params)
    setLoading(false)
    setIsOpen(false)
    setPublicUrl(null)
    form.reset()
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { url, data } = await handleUploadSupaBase(e, 'images', 'public ')
    if (url) {
      setPublicUrl(url)
    }
    form.setValues({ logo: data?.path })
  }

  const fields = form.values.questions.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <div
          className="relative my-4 flex items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="-mr-1" {...provided.dragHandleProps}>
            <IconGripVertical size={30} />
          </div>
          <input
            className="input-primary input  w-full max-w-sm"
            placeholder="Question"
            {...form.getInputProps(`questions.${index}.question`)}
          />
          <button
            className="btn-sm"
            onClick={() => form.removeListItem('questions', index)}
          >
            <IconCircleMinus size={25} />
          </button>
        </div>
      )}
    </Draggable>
  ))

  return (
    <>
      <div className=" mx-auto  bg-dotted-spacing-4 bg-dotted-gray-300">
        <div className="container m-auto h-screen">
          <NavBar />
          <div className="my-10  flex w-full  justify-between  justify-items-end ">
            <button onClick={openModal} className="btn">
              <AiOutlinePlus className="mr-3 h-5 w-5" />
              Create Spaces
            </button>
          </div>
          <div className=" mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {data?.map((item, index) => (
              <Cards key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-auto w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Your Space
                  </Dialog.Title>
                  <div className="my-6 grid grid-cols-2 gap-4">
                    <div className="w-full  bg-base-100">
                      <Image
                        className="h-screen object-cover"
                        objectFit={'cover'}
                        width={1035}
                        height={1000}
                        alt={'image'}
                        src="https://images.unsplash.com/photo-1613687194025-417d0e1783aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
                      />
                    </div>
                    <form
                      onSubmit={form.onSubmit((values) =>
                        handleOnSubmit(values)
                      )}
                    >
                      <div className="form-control">
                        <div
                          className="tooltip flex items-center"
                          data-tip={'eg, beyondur.com/your-name-space'}
                        >
                          <IconInfoSquare size={20} />
                          <label className="label"> Spaces URL </label>
                        </div>

                        <input
                          type="text"
                          placeholder="Type here"
                          className="input-bordered input-primary input w-full max-w-md"
                          {...form.getInputProps('space_name')}
                        />

                        {form.errors.space_name ? (
                          <p className="my-2 text-sm text-error">
                            {' '}
                            {form.errors.space_name}{' '}
                          </p>
                        ) : null}
                        <div className="avatar my-5 items-center">
                          <div className="mr-2 w-16 rounded-full">
                            <Image
                              objectFit={'cover'}
                              width={200}
                              height={200}
                              alt={'image'}
                              src={publicUrl ? publicUrl : '/./logodefault.jpg'}
                            />
                          </div>
                          <label className="btn-ghost btn-sm btn my-2 w-52">
                            <IconFileUpload size={20} />
                            <span className="text-base leading-normal">
                              Select a file
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

                        <label className="label"> Header Title </label>
                        <input
                          type="text"
                          placeholder="Header Title"
                          className="input-bordered input-primary input w-full max-w-md"
                          {...form.getInputProps('header_title')}
                        />
                        {form.errors.header_title && (
                          <p className="my-2 text-sm text-error">
                            {' '}
                            Header Title is required *{' '}
                          </p>
                        )}
                        <label className="label"> Custom Message </label>
                        <textarea
                          className="textarea-primary textarea w-full max-w-md "
                          placeholder="Message"
                          {...form.getInputProps('custom_message')}
                        ></textarea>
                        {form.errors.custom_message && (
                          <p className="text-sm text-error ">
                            {' '}
                            Custom Message is required *{' '}
                          </p>
                        )}
                        <button
                          type={'button'}
                          className="btn-ghost btn-wide btn-sm btn mt-4"
                          onClick={() =>
                            form.insertListItem('questions', { question: '' })
                          }
                        >
                          <IconPlus size={'20'} /> Add Question
                        </button>
                        <DragDropContext
                          onDragEnd={({ destination, source }) =>
                            form.reorderListItem('questions', {
                              from: source.index,
                              to: destination?.index,
                            } as ReorderPayload)
                          }
                        >
                          <Droppable
                            droppableId="dnd-list"
                            direction="vertical"
                          >
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {fields}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                        {form.errors.questions && (
                          <p className="text-sm text-error ">
                            {' '}
                            {form.errors.questions} *{' '}
                          </p>
                        )}
                      </div>
                      <button
                        className={`btn-primary btn ${
                          loading ? `loading` : ''
                        } btn-wide`}
                        type="submit"
                      >
                        {' '}
                        Create Spaces
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: spaces } = await supabase
    .from('spaces')
    .select()
    .eq('user_id', session?.user?.id)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
      user: session?.user.id,
      spaces,
    },
  }
}

export default Dashboard
