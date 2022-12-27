import {Dialog, Transition} from "@headlessui/react";
import {
    Dispatch,
    Fragment,
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactFragment,
    ReactPortal, SetStateAction,
    useCallback, useEffect,
    useState
} from "react";
import Webcam from "react-webcam";
import VideoRecorder from "react-video-recorder";
import {func} from "prop-types";

interface deviceProps {
    map( arg0: ( device: deviceProps, index: Key | null | undefined ) => JSX.Element | undefined ): import("react").ReactNode;
    kind: string;
    deviceId: string | number | readonly string[] | undefined;
    label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
}
interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    videoFormStep: number;
    setVideoFormStep: Dispatch<SetStateAction<number>>;
}


export const CreateVideo = ({ isOpen , setIsOpen , videoFormStep, setVideoFormStep} : IProps) => {

    let [devices, setDevices] = useState () as deviceProps[]
    let [selectedMediaDevice, setSelectedMediaDevice] = useState ( {
        video : "",
        audio : ""
    } )
    let [stream, setStream] = useState ( null )


    const handleDevices = useCallback (
        ( mediaDevices: any ) =>
            // @ts-ignore
            setDevices ( mediaDevices.filter ( ( { kind } ) => kind === 'videoinput' || kind === 'audioinput' ) ),
        [setDevices]
    );
    const constraints = {
        video: true,
        audio: true
    }

    function successCallback() {
        navigator.mediaDevices.enumerateDevices ().then ( handleDevices );
        console.log("success")
    }
    function errorCallback() {
        console.log("error")
    }

    useEffect (
        () => {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(successCallback, errorCallback);
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
    let newObjectUrl
    if(stream) {
        newObjectUrl = URL.createObjectURL( stream );
    }

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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        Check Your Camera and Microphone
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Your payment has been successfully submitted. We’ve sent
                                            you an email with all of the details of your order.
                                        </p>
                                    </div>

                                    <div className="border w-auto h-auto my-2">
                                        {videoFormStep === 0 ? <Webcam mirrored={true}
                                                                       audio={false}
                                                                       videoConstraints={{
                                                                           deviceId : selectedMediaDevice.video }}/> : null}
                                        {videoFormStep === 1
                                            ? (
                                                // @ts-ignore
                                                <VideoRecorder
                                                    constraints={{
                                                        audio: true,
                                                        video: true,
                                                        devices:{
                                                            audio: selectedMediaDevice.audio,
                                                            video: selectedMediaDevice.video
                                                        },
                                                        width: 1280,
                                                        height: 720,
                                                    }}
                                                    isOnInitially={true}
                                                    countdownTime={3000}
                                                    dataAvailableTimeout={500}
                                                    isFlipped
                                                    chunkSize={250}
                                                    onRecordingComplete={(videoBlob: any , videoUrl: any ) => {
                                                        // Do something with the video...
                                                        setStream(videoBlob)
                                                        console.log('videoBlob', videoUrl)
                                                        setVideoFormStep(2)
                                                    }}
                                                    t={(key: any  ) => {
                                                        console.log('key', key)
                                                        if(key === 'PRESS') return 'Press'
                                                        if(key === 'REC') return 'Record'
                                                        if(key === 'WHEN READY') return 'Start'
                                                        if(key === 'RECORDING') return 'Recording'
                                                        if(key === 'STOP') return 'Stop'
                                                        if(key === 'Use another video') return 'Use another video'

                                                    }}

                                                />

                                            )
                                            : null}
                                        {videoFormStep === 2 ?
                                            <div className="flex flex-col">
                                                <video src={newObjectUrl} controls={true} className="w-auto h-auto"/>
                                            </div>
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
                                                            <option key={index} value={device.deviceId}>{device.label}</option>
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
                                                            <option key={index} value={device.deviceId}>{device.label}</option>
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
                                        : null }
                                    {videoFormStep === 2 ?(
                                        <div className="flex flex-col w-full my-5">
                                            <div className="rating my-3">
                                                <input type="radio" name="rating-2"
                                                       className="mask mask-star-2 bg-orange-400"/>
                                                <input type="radio" name="rating-2"
                                                       className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-2"
                                                       className="mask mask-star-2 bg-orange-400" checked/>
                                                <input type="radio" name="rating-2"
                                                       className="mask mask-star-2 bg-orange-400"/>
                                                <input type="radio" name="rating-2"
                                                       className="mask mask-star-2 bg-orange-400"/>
                                            </div>
                                            <span className="label-text my-2">Your Name</span>
                                            <input type="text"
                                                   className="input input-bordered w-full max-w-lg my-2"/>
                                            <span className="label-text my-2">Your Email</span>
                                            <input type="text"
                                                   className="input input-bordered w-full max-w-lg my-2"/>
                                            <div className="flex my-5">
                                                <input type="checkbox" checked className="checkbox my-2"/>
                                                <span className="label-text my-2 mx-2">I agree to the terms and conditions</span>
                                            </div>
                                            <div className="flex justify-evenly">
                                                <button onClick={()=>{
                                                    setVideoFormStep(0)
                                                }} className="btn btn-ghost">Record Again</button>
                                                <button className="btn btn-primary">Confirm to Send</button>
                                            </div>


                                        </div>
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
