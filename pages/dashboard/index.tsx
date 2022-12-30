import {GetServerSideProps, NextPage} from "next";
import {NavBar} from "@/components/NavBar";
import {AiOutlinePlus} from "react-icons/ai";
import {Cards} from "@/components/Cards";
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {useForm} from "@mantine/form";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {IconCircleMinus, IconFileUpload, IconGripVertical, IconInfoSquare, IconPlus} from '@tabler/icons';
import {ReorderPayload} from "@mantine/form/lib/types";
import {useCreateSpace, useGetSpaces} from "../../hooks/apis";
import {handleUploadSupaBase} from "../../hooks/apis/supabase";
import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {TSpaceRow} from "../../utils/types";
import Image from "next/image";
import {supabase} from "../../utils/database/client";

interface Props {
    initialSession: any,
    user: string,
    spaces: TSpaceRow[]
}

const checkIfValidURLSlug = ( str: string ) => {
    const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;
    return regexExp.test ( str );
}


interface FormValues {
    questions: {
        question: string;
    }[];
    space_name: string;
    header_title: string;
    custom_message: string;
    logo: string;
    user_id: string;
}

const Dashboard: NextPage<Props> = ( props ) => {
    const { initialSession, user, spaces } = props;
    let [isOpen, setIsOpen] = useState ( false )
    let [publicUrl, setPublicUrl] = useState ( null )
    let [loading, setLoading] = useState ( false )
    const { data, isFetching } = useGetSpaces ( spaces, user )

    const mutation = useCreateSpace ()


    function closeModal() {
        setIsOpen ( false )
    }

    function openModal() {
        setIsOpen ( true )
    }


    const form = useForm<FormValues> ( {
        initialValues : {
            questions : [
                { question : '' },
            ],
            space_name : '',
            header_title : '',
            custom_message : '',
            logo : '  ',
            user_id : user,
        },
        validate : ( values ) => {
            const errors: any = {};
            if (!values.space_name) {
                errors.space_name = 'Space name is required';
            }
            if (!checkIfValidURLSlug ( values.space_name )) {
                errors.space_name = 'Invalid space name should be a-z0-9';
            }
            if (!values.header_title) {
                errors.header_title = 'Header title is required';
            }
            if (!values.custom_message) {
                errors.custom_message = 'Custom message is required';
            }
            return errors;
        },
    } );

    useEffect ( () => {
        // search if space name is already taken
        if (form.values.space_name) {
            supabase.from ( 'spaces' ).select ( 'name' ).eq ( 'name', form.values.space_name ).then ( ( {
                                                                                                            data,
                                                                                                            error
                                                                                                        } ) => {
                if (data) {
                    console.log ( data )
                    if (data.length > 0) {
                        form.setFieldError ( 'space_name', 'Space name is already taken' )
                    }
                }
            } )

        }

    }, [form.values.space_name] )

    const handleOnSubmit = async ( values: FormValues ) => {
        setLoading ( true )
        form.validate ();
        const params = {
            name : values.space_name,
            title : values.header_title,
            message : values.custom_message,
            questions : values.questions,
            logo_image : values.logo,
            isVideoOnly : false,
            isUserConsent : false,
            isRating : false,
            links : [],
            user_id : values.user_id,
        }

        mutation.mutate ( params )
        setLoading ( false )
        setIsOpen ( false )
        setPublicUrl ( null )
        form.reset ()

    }

    const handleUpload = async ( e: any ) => {
        const { url, data } = await handleUploadSupaBase ( e, user )
        if (url) {
            setPublicUrl ( url )
        }
        form.setValues ( { logo : data?.path } )
    }

    const fields = form.values.questions.map ( ( _, index ) => (
        <Draggable key={index} index={index} draggableId={index.toString ()}>
            {( provided ) => (
                <div className="flex relative items-center my-4" ref={provided.innerRef}  {...provided.draggableProps}>
                    <div className="-mr-1"  {...provided.dragHandleProps}>
                        <IconGripVertical size={30}/>
                    </div>
                    <input className="input input-primary  w-full max-w-sm"
                           placeholder="Question" {...form.getInputProps ( `questions.${index}.question` )} />
                    <button className="btn-sm" onClick={() => form.removeListItem ( 'questions', index )}>
                        <IconCircleMinus size={25}/>
                    </button>
                </div>
            )}
        </Draggable>
    ) );


    return (
        <>
            <div className=" bg-dotted-spacing-4  bg-dotted-gray-300 mx-auto">
                <div className="container m-auto h-screen">
                    <NavBar/>
                    <div className="flex  justify-between w-full  my-10  justify-items-end ">
                        <button onClick={openModal} className="btn">
                            <AiOutlinePlus className="h-5 w-5 mr-3"/>
                            Create Spaces
                        </button>

                    </div>
                    <div className=" mt-6 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {data?.map ( ( item, index ) => (
                            <Cards key={index} data={item}/>
                        ) )}
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
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                <Dialog.Panel
                                    className="w-full h-auto max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create Your Space
                                    </Dialog.Title>
                                    <div className="grid grid-cols-2 gap-4 my-6">
                                        <div className="bg-base-100  w-full">


                                            <Image className="object-cover h-screen" objectFit={'cover'} width={1000}
                                                   height={1000}
                                                   src="https://images.unsplash.com/photo-1613687194025-417d0e1783aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"/>

                                        </div>
                                        <form onSubmit={form.onSubmit ( ( values ) => handleOnSubmit ( values ) )}>
                                            <div className="form-control">

                                                <div className="tooltip flex items-center"
                                                     data-tip={"eg, beyondur.com/your-name-space"}>
                                                    <IconInfoSquare
                                                        size={20}/>
                                                    <label className="label"
                                                    > Spaces
                                                        URL </label>
                                                </div>


                                                <input type="text" placeholder="Type here"
                                                       className="input input-bordered input-primary w-full max-w-md"
                                                       {...form.getInputProps ( 'space_name' )}
                                                />

                                                {form.errors.space_name ? (
                                                    <p className="text-error text-sm my-2"> {form.errors.space_name} </p>
                                                ) : null}
                                                <div className="avatar my-5 items-center">
                                                    <div className="w-16 rounded-full mr-2">
                                                        <Image objectFit={"cover"} width={200} height={200}
                                                               src={publicUrl ? publicUrl : '/./logodefault.jpg'}/>
                                                    </div>
                                                    <label
                                                        className="btn btn-ghost btn-sm w-52 my-2">
                                                        <IconFileUpload size={20}/>
                                                        <span className="text-base leading-normal">Select a file</span>
                                                        <input onChange={async ( event ) => {
                                                            await handleUpload ( event )
                                                        }} type='file' accept=" image/jpeg " className="hidden"/>
                                                    </label>
                                                </div>

                                                <label className="label"> Header Title </label>
                                                <input type="text" placeholder="Header Title"
                                                       className="input input-bordered input-primary w-full max-w-md"
                                                       {...form.getInputProps ( 'header_title' )}
                                                />
                                                {form.errors.header_title && (
                                                    <p className="text-error text-sm my-2"> Header Title is required
                                                        * </p>
                                                )}
                                                <label className="label"> Custom Message </label>
                                                <textarea className="textarea textarea-primary w-full max-w-md "
                                                          placeholder="Message"
                                                          {...form.getInputProps ( 'custom_message' )}
                                                ></textarea>
                                                {form.errors.custom_message && (
                                                    <p className="text-error text-sm "> Custom Message is required
                                                        * </p>
                                                )}
                                                <button type={"button"} className="btn btn-ghost btn-wide btn-sm mt-4"
                                                        onClick={() => form.insertListItem ( 'questions', { question : '' } )}>
                                                    <IconPlus size={"20"}/> Add Question
                                                </button>
                                                <DragDropContext
                                                    onDragEnd={( { destination, source } ) =>
                                                        form.reorderListItem ( 'questions', {
                                                            from : source.index,
                                                            to : destination?.index
                                                        } as ReorderPayload )
                                                    }
                                                >
                                                    <Droppable droppableId="dnd-list" direction="vertical">
                                                        {( provided ) => (
                                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                                {fields}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                                {form.errors.questions && (
                                                    <p className="text-error text-sm "> {form.errors.questions} * </p>
                                                )}

                                            </div>
                                            <button className={`btn btn-primary ${loading ? `loading` : ''} btn-wide`}
                                                    type="submit"> Create Spaces
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

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
    const supabase = createServerSupabaseClient ( ctx )

    const {
        data : { session },
    } = await supabase.auth.getSession ()

    const { data : spaces } = await supabase
        .from ( "spaces" )
        .select ()
        .eq ( "user_id", session?.user?.id )


    if (!session) {
        return {
            redirect : {
                destination : '/auth/login',
                permanent : false,
            },
        }
    }

    return {
        props : {
            initialSession : session,
            user : session?.user.id,
            spaces
        },
    }
}

export default Dashboard
