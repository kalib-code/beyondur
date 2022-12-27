import {Dialog, Transition} from "@headlessui/react";
import {Dispatch, Fragment, SetStateAction, useState} from "react";

interface IProps {
    isOpen2: boolean;
    setIsOpen2: Dispatch<SetStateAction<boolean>>;

}


export const CreateText = ({isOpen2, setIsOpen2} : IProps) => {


    function closeModal() {
        setIsOpen2(false);
    }

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
                                        Write your testimony
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col">

                                        <div className="rating items-center my-2 ">
                                            <label className="block text-md font-medium text-gray-700 mr-2">Rating</label>
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        </div>

                                        <textarea className="textarea textarea-bordered my-2" placeholder="Message"></textarea>

                                        <label className="block text-md font-medium text-gray-700 ">Attach Image</label>
                                        <input type="file"
                                               className="file-input file-input-bordered file-input-sm w-full max-w-xs"/>
                                        <label className="block text-md font-medium text-gray-700 ">Email</label>
                                        <input type="text" placeholder="Type here"
                                               className="input input-bordered w-full max-w-lg"/>
                                        <label className="block text-md font-medium text-gray-700 ">Name</label>
                                        <input type="text" placeholder="Type here"
                                               className="input input-bordered w-full max-w-lg"/>
                                        <label className="block text-md font-medium text-gray-700 ">Profile Image</label>
                                        <input type="file"
                                               className="file-input file-input-bordered file-input-sm w-full max-w-xs"/>
                                        <div className=" flex items-center">
                                            <input type="checkbox" checked className="checkbox my-2"/>
                                            <span className="label-text my-2 mx-2">I agree to the terms and conditions</span>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <button onClick={closeModal} className="btn btn-ghost mr-5">Cancel</button>
                                            <button onClick={closeModal} className="btn btn-primary">Send Your Message</button>
                                        </div>



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
