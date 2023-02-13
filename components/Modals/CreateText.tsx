/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { IconFileUpload } from '@tabler/icons'
import { handleUploadSupaBase } from '../../hooks/apis/supabase'
import { useForm } from '@mantine/form'
import { useCreateTestimony } from '../../hooks/apis/testimonies'
import { Json } from '../../utils/types/database'
import Image from 'next/image'

interface IProps {
  isOpen2: boolean
  setIsOpen2: Dispatch<SetStateAction<boolean>>
  spaceId: {
    id: string
    created_at: string | null
    modified_at: string | null
    name: string | null
    title: string | null
    message: string | null
    questions: {
      question: string
    }[]
    logo_image: string | null
    isVideoOnly: boolean | null
    isUserConsent: boolean | null
    isRating: boolean | null
    links: Json[] | null
  }
}

interface IForm {
  rating: number
  message: string
  attach_images: string
  email: string
  name: string
  photo: string
  isUserPermission: boolean
  isHighlight: boolean
  isLike: boolean
  spaces: string
}

export const CreateText = ({ isOpen2, setIsOpen2, spaceId }: IProps) => {
  let [file, setFile] = useState<string>('')
  let [profile, setProfile] = useState<string>('')
  const mutation = useCreateTestimony()

  function closeModal() {
    setIsOpen2(false)
    form.reset()
  }

  const handleUploadAttach = async (e: any) => {
    const { url, data } = await handleUploadSupaBase(e, 'images', 'public')
    setFile(url)
    form.setValues({ attach_images: data?.path })
  }

  const handleUpload = async (e: any) => {
    const { url, data } = await handleUploadSupaBase(e, 'images', 'public')
    setProfile(url)
    form.setValues({ photo: data?.path })
  }

  const onSubmitText = async (values: any) => {
    mutation.mutate(values)
    closeModal()
  }

  const form = useForm<IForm>({
    initialValues: {
      rating: 0,
      message: '',
      attach_images: '',
      email: '',
      name: '',
      photo: '',
      isUserPermission: false,
      isHighlight: false,
      isLike: false,
      spaces: spaceId.id,
    },
    validate: (values) => {
      const errors: Record<string, string> = {}

      if (!values.name) {
        errors.name = 'Name is required'
      }
      if (!values.email) {
        errors.email = 'Email is required'
      }

      if (!values.message) {
        errors.message = 'Message is required'
      }
      if (values.rating <= 0) {
        errors.rating = 'Rating is required'
      }
      return errors
    },
  })
  return (
    <>
      <Transition appear show={isOpen2} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Write your testimony
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col">
                    <form
                      onSubmit={form.onSubmit((values) => onSubmitText(values))}
                    >
                      <div className="rating my-3">
                        <label className={'mr-2'}>Rating</label>
                        <input
                          type="radio"
                          name="rating-2"
                          id="rating-2-1"
                          className="mask mask-star-2 bg-orange-400"
                          checked={form.values.rating === 1}
                          value={1}
                          onClick={() => form.setFieldValue('rating', 1)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          value={2}
                          checked={form.values.rating === 2}
                          onClick={() => form.setFieldValue('rating', 2)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          value={3}
                          checked={form.values.rating === 3}
                          onClick={() => form.setFieldValue('rating', 3)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          value={4}
                          checked={form.values.rating === 4}
                          onClick={() => form.setFieldValue('rating', 4)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          value={5}
                          checked={form.values.rating === 5}
                          onClick={() => form.setFieldValue('rating', 5)}
                        />
                      </div>

                      <textarea
                        className="textarea-bordered textarea my-2 w-full"
                        placeholder="Message"
                        {...form.getInputProps('message')}
                      ></textarea>
                      {form.errors.message && (
                        <div className="text-xs text-red-500">
                          {form.errors.message}
                        </div>
                      )}
                      <label className="text-md block font-medium text-gray-700 ">
                        Attach Image
                      </label>
                      {file && (
                        <Image
                          width={'100%'}
                          height={'100%'}
                          className={''}
                          src={file}
                          alt=""
                        />
                      )}
                      <label className="btn-ghost btn-sm btn my-2 w-52">
                        <IconFileUpload size={20} />
                        <span className="text-base leading-normal">
                          Attach Images
                        </span>

                        <input
                          onChange={async (event) => {
                            await handleUploadAttach(event)
                          }}
                          type="file"
                          accept="image/jpeg"
                          className="hidden"
                        />
                      </label>
                      <label className="text-md block font-medium text-gray-700 ">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input-bordered input w-full max-w-lg"
                        {...form.getInputProps('email')}
                      />
                      {form.errors.email && (
                        <div className="text-xs text-red-500">
                          {form.errors.email}
                        </div>
                      )}
                      <label className="text-md block font-medium text-gray-700 ">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input-bordered input w-full max-w-lg"
                        {...form.getInputProps('name')}
                      />
                      {form.errors.name && (
                        <div className="text-xs text-red-500">
                          {form.errors.name}
                        </div>
                      )}
                      <div className="avatar my-5 items-center">
                        <div className="mr-2 w-16 rounded-full">
                          <Image
                            width={'100%'}
                            height={'100%'}
                            objectFit={'cover'}
                            src={profile ? profile : '/../logodefault.jpg'}
                            alt={profile}
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
                            accept="image/jpeg"
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className=" flex items-center">
                        <input
                          type="checkbox"
                          className="checkbox my-2"
                          required={true}
                          {...form.getInputProps('isUserPermission', {
                            type: 'checkbox',
                          })}
                        />
                        <span className="label-text my-2 mx-2">
                          I agree to the terms and conditions
                        </span>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={closeModal}
                          className="btn-ghost btn mr-5"
                        >
                          Cancel
                        </button>
                        <button type={'submit'} className="btn-primary btn">
                          Send Your Message
                        </button>
                      </div>
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
