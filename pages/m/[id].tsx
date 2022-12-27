import {NextPage} from "next";
import {NavBar} from "@/components/NavBar";
import {CreateVideo} from "@/components/Modals";

import {
    useState,
} from "react";
import {CreateText} from "@/components/Modals/CreateText";



const Walls: NextPage = () => {

    let [isOpen, setIsOpen] = useState ( false )
    let [isOpen2, setIsOpen2] = useState ( false )
    let [videoFormStep, setVideoFormStep] = useState ( 0 )

    function openModal() {
        setIsOpen ( true )
    }

    function openModal2() {
        setIsOpen2 ( true )
    }

    // @ts-ignore
    return (
        <div className=" m-auto bg-dotted-spacing-4 bg-dotted-gray-100 bg-dotted-spacing-4 bg-dotted-gray-300 w-full h-screen z-50  ">
            <NavBar/>

            <div className="hero min-h-96  ">
                <div className="hero-content text-center border rounded-md shadow-sm bg-base-100 m-10 p-10 ">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <div className="max-w-md py-6 ">
                            <h2 className="text-2xl font-bold">Question</h2>
                            <ul>
                                <li>What is Lorem Ipsum?</li>
                                <li>Why do we use it?</li>
                                <li>Where does it come from?</li>
                            </ul>


                        </div>
                        <div className="flex-auto py-6 ">
                            <button onClick={openModal} className="btn btn-secondary mr-10">Record Video</button>
                            <button onClick={openModal2} className="btn btn-primary">Text Testimony</button>
                        </div>
                    </div>
                </div>
            </div>

            <CreateVideo isOpen={isOpen} setIsOpen={setIsOpen} videoFormStep={videoFormStep} setVideoFormStep ={setVideoFormStep} />
            <CreateText isOpen2={isOpen2} setIsOpen2={setIsOpen2}  />


        </div>
    )
}

export default Walls
