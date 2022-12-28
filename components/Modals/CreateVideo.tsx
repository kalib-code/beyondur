import {Dialog, Transition} from "@headlessui/react";
import React, {
    Dispatch,
    Fragment,
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactFragment,
    ReactPortal,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import Webcam from "react-webcam";
import VideoRecorder from "react-video-recorder";
import {useForm} from "@mantine/form";
import {useCreateTestimony} from "../../hooks/apis/testimonies";
import {uploadFile} from "../../utils/services/aws/s3";
import {Json} from "../../utils/types/database";
import "plyr-react/plyr.css"
import Plyr from "plyr-react";


interface deviceProps {
    kind: string;
    deviceId: string | number | readonly string[] | undefined;
    label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;

    map( arg0: ( device: deviceProps, index: Key | null | undefined ) => JSX.Element | undefined ): import("react").ReactNode;
}

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    videoFormStep: number;
    setVideoFormStep: Dispatch<SetStateAction<number>>;
    spaceId: {
        id: string
        created_at: string | null
        modified_at: string | null
        name: string | null
        title: string | null
        message: string | null
        questions: {
            question: string
        } []
        logo_image: string | null
        isVideoOnly: boolean | null
        isUserConsent: boolean | null
        isRating: boolean | null
        links: Json[] | null
    };
}

interface IFormValues {
    name: string,
    email: string,
    rating: number,
    video_url: string,
    isVideo: boolean,
    tags: Array<string>,
    isHighlight: boolean,
    isLike: boolean,
    spaces: string,
    isUserPermission: boolean,

}


export const CreateVideo = ( { isOpen, setIsOpen, videoFormStep, setVideoFormStep, spaceId }: IProps ) => {
    const mutation = useCreateTestimony ()
    const form = useForm<IFormValues> ( {
        initialValues : {
            name : '',
            email : '',
            rating : 3,
            video_url : '',
            isVideo : true,
            tags : [],
            isHighlight : false,
            isLike : false,
            spaces : spaceId.id,
            isUserPermission : false,
        },
        validate( values ) {
            const errors: Partial<IFormValues> = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            }

            return errors;
        },
    } )


    let [loading, setLoading] = useState ( false )
    let [devices, setDevices] = useState () as deviceProps[]
    let [selectedMediaDevice, setSelectedMediaDevice] = useState ( {
        video : "",
        audio : ""
    } )
    let [stream, setStream] = useState<Blob> ()
    let [streamUrl, setStreamUrl] = useState ( "" )


    const handleDevices = useCallback (
        ( mediaDevices: any ) =>
            // @ts-ignore
            setDevices ( mediaDevices.filter ( ( { kind } ) => kind === 'videoinput' || kind === 'audioinput' ) ),
        [setDevices]
    );
    const constraints = {
        video : true,
        audio : true
    }

    function successCallback() {
        navigator.mediaDevices.enumerateDevices ().then ( handleDevices );
        console.log ( "success" )
    }

    function errorCallback() {
        console.log ( "error" )
    }

    useEffect (
        () => {
            navigator.mediaDevices.getUserMedia ( constraints )
                .then ( successCallback, errorCallback );
        },
        []
    );

    function closeModal() {
        setIsOpen ( false )
    }

    function setVideoFormSteps() {
        setVideoFormStep ( videoFormStep + 1 )
    }

    // @ts-ignore


    const onSubmitVideo = async ( values: any ) => {
        form.validate ()
        setLoading ( true )
        const file = {
            data : stream as Blob,
            userId : "123",
            spaceId,
        }
        if (!stream) return;
        const uploadData = await uploadFile ( file )
        values.video_url = uploadData.Key.replace ( 'input/', '' ) as string
        await mutation.mutateAsync ( values )
        setLoading ( false )
        form.reset ()
        closeModal ()

    }

    const sourceData = useMemo ( () => {
        return {
            source : {
                type : 'video',
                sources : [{
                    src : streamUrl,
                    type : 'video/webm',
                }
                ]
            }, // https://github.com/sampotts/plyr#the-source-setter
            options : undefined, // https://github.com/sampotts/plyr#options
        };
    }, [streamUrl] );

    return (
        <>

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
                                    className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {videoFormStep === 0 ? <>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg text-center font-medium leading-6 text-gray-900"
                                            >
                                                Check Your Camera and Microphone
                                            </Dialog.Title>
                                        </>
                                        : null}
                                    {videoFormStep === 1 ? <>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-medium leading-6 text-gray-900"
                                        >
                                            Question
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <ul>
                                                {spaceId.questions.map ( ( question, index ) => {
                                                    return <li className=""
                                                               key={index}>{question.question}</li>
                                                } )}
                                            </ul>
                                        </div>
                                    </> : null}
                                    {videoFormStep === 2 ? <>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl text-center font-medium leading-6 text-gray-900"
                                        >
                                            Review your Video
                                        </Dialog.Title>
                                        <p className="text-sm text-center text-gray-500">
                                            Please fill out the required fields and submit your video.
                                        </p>
                                    </> : null}
                                    <div className="mt-2">
                                        {videoFormStep === 0 ? <>
                                            <p className="text-sm text-gray-500">
                                                You have up to 120 seconds to record your video. Please make sure
                                                your
                                                camera and microphone are working properly.
                                            </p>
                                        </> : null}
                                    </div>

                                    <div className="border w-auto h-auto my-2">
                                        {videoFormStep === 0 ? <Webcam mirrored={true}
                                                                       audio={false}
                                                                       videoConstraints={{
                                                                           deviceId : selectedMediaDevice.video
                                                                       }}/> : null}
                                        {videoFormStep === 1
                                            ? (
                                                // @ts-ignore
                                                <VideoRecorder
                                                    constraints={{
                                                        audio : true,
                                                        video : true,
                                                        devices : {
                                                            audio : selectedMediaDevice.audio,
                                                            video : selectedMediaDevice.video
                                                        },
                                                        width : 1280,
                                                        height : 720,
                                                    }}
                                                    isOnInitially={true}
                                                    countdownTime={3000}
                                                    dataAvailableTimeout={500}
                                                    isFlipped
                                                    chunkSize={250}
                                                    onRecordingComplete={async ( videoBlob: any ) => {
                                                        const Url = URL.createObjectURL ( videoBlob )
                                                        setStream ( videoBlob )
                                                        setStreamUrl ( Url )
                                                        setVideoFormStep ( 2 )
                                                    }}
                                                    t={( key: any ) => {
                                                        if (key === 'PRESS') return 'Press'
                                                        if (key === 'REC') return 'Record'
                                                        if (key === 'WHEN READY') return 'Start'
                                                        if (key === 'RECORDING') return 'Recording'
                                                        if (key === 'STOP') return 'Stop'
                                                        if (key === 'Use another video') return 'Use another video'
                                                    }}

                                                />

                                            )
                                            : null}

                                    </div>
                                    {videoFormStep === 0 ?
                                        <>
                                            <select defaultValue={"Default"} onChange={
                                                ( event ) => {
                                                    setSelectedMediaDevice ( {
                                                        ...selectedMediaDevice,
                                                        video : event.target.value
                                                    } )
                                                }
                                            } className="select w-full max-w-md border my-2">
                                                {devices && devices.map ( ( device: deviceProps, index: Key | null | undefined ) => {
                                                    if (device.kind === 'videoinput') {
                                                        return (
                                                            <option key={index}
                                                                    value={device.deviceId}>{device.label}</option>
                                                        )

                                                    }

                                                } )}

                                            </select>
                                            <select defaultValue={"Default"} onChange={
                                                ( e ) => {
                                                    setSelectedMediaDevice ( {
                                                        ...selectedMediaDevice,
                                                        audio : e.target.value
                                                    } )
                                                }
                                            } className="select w-full max-w-md border my-2">
                                                {devices && devices?.map ( ( device: deviceProps, index: Key | null | undefined ) => {
                                                    if (device.kind === 'audioinput') {
                                                        return (
                                                            <option key={index}
                                                                    value={device.deviceId}>{device.label}</option>
                                                        )
                                                    }
                                                } )}
                                            </select>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary my-2 w-full"
                                                    onClick={setVideoFormSteps}
                                                >
                                                    Record Video
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-ghost my-2 w-full"
                                                    onClick={closeModal}
                                                >
                                                    Upload from file
                                                </button>
                                            </div>
                                        </>
                                        : null}
                                    {videoFormStep === 2 ? (
                                        <>
                                            <div className=" justify-center w-fit h-fit">
                                                {
                                                    // @ts-ignore
                                                    <Plyr
                                                        {...sourceData}
                                                    />}
                                            </div>
                                            <div className="flex flex-col w-full my-5">
                                                <form
                                                    onSubmit={form.onSubmit ( ( values ) => onSubmitVideo ( values ) )}>
                                                    <div className="rating my-3">
                                                        <input type="radio" name="rating-2" id="rating-2-1"
                                                               className="mask mask-star-2 bg-orange-400"
                                                               value={1}
                                                               checked={form.values.rating === 1}
                                                               onChange={() => form.setFieldValue ( 'rating', 1 )}

                                                        />
                                                        <input type="radio" name="rating-2"
                                                               className="mask mask-star-2 bg-orange-400"
                                                               value={2}
                                                               checked={form.values.rating === 2}
                                                               onChange={() => form.setFieldValue ( 'rating', 2 )}

                                                        />
                                                        <input type="radio" name="rating-2"
                                                               className="mask mask-star-2 bg-orange-400"
                                                               value={3}
                                                               checked={form.values.rating === 3}
                                                               onChange={() => form.setFieldValue ( 'rating', 3 )}

                                                        />
                                                        <input type="radio" name="rating-2"
                                                               className="mask mask-star-2 bg-orange-400"
                                                               value={4}
                                                               checked={form.values.rating === 4}
                                                               onChange={() => form.setFieldValue ( 'rating', 4 )}

                                                        />
                                                        <input type="radio" name="rating-2"
                                                               className="mask mask-star-2 bg-orange-400"
                                                               value={5}
                                                               checked={form.values.rating === 5}
                                                               onChange={() => form.setFieldValue ( 'rating', 5 )}
                                                        />
                                                    </div>
                                                    <span className="label-text my-2">Your Name</span>
                                                    <input type="text"
                                                           className="input input-bordered w-full max-w-lg my-2"
                                                           {...form.getInputProps ( 'name' )}
                                                    />
                                                    <span className="label-text my-2">Your Email</span>
                                                    <input type="text"
                                                           className="input input-bordered w-full max-w-lg my-2"
                                                           {...form.getInputProps ( 'email' )}
                                                    />
                                                    <div className="flex my-5">
                                                        <input type="checkbox" className="checkbox my-2"
                                                               required
                                                               {...form.getInputProps ( 'isUserPermission', { type : "checkbox" } )}
                                                        />
                                                        <span className="label-text my-2 mx-2">I agree to the terms and conditions</span>
                                                    </div>
                                                    <div className="flex justify-evenly">
                                                        <button type={'button'} onClick={() => {
                                                            setVideoFormStep ( 0 )
                                                        }} className="btn btn-ghost">Record Again
                                                        </button>
                                                        <button type={"submit"}
                                                                className={`btn btn-primary ${loading ? `loading` : ''}`}>Confirm
                                                            to
                                                            Send
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                        </>
                                    ) : null}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </>
    )
}
