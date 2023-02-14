import { GetServerSideProps, NextPage } from 'next';
import { NavBar } from '@/components/NavBar';
import { CreateVideo } from '@/components/Modals';

import { useState } from 'react';
import { CreateText } from '@/components/Modals/CreateText';
import { supabase } from '../../utils/database/client';
import { Json } from '../../utils/types/database';

interface Props {
  data: {
    id: string;
    created_at: string | null;
    modified_at: string | null;
    name: string | null;
    title: string | null;
    message: string | null;
    questions: {
      question: string;
    }[];
    logo_image: string | null;
    isVideoOnly: boolean | null;
    isUserConsent: boolean | null;
    isRating: boolean | null;
    links: Json[] | null;
  };
}

const Walls: NextPage<Props> = props => {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);
  let [videoFormStep, setVideoFormStep] = useState(0);

  function openModal() {
    setIsOpen(true);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  return (
    <div className=" z-50 m-auto h-screen w-full bg-dotted-spacing-4 bg-dotted-gray-300  ">
      <NavBar />

      <div className="min-h-96 hero  ">
        <div className="hero-content m-10 rounded-md border bg-base-100 p-10 text-center shadow-sm ">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{props.data.title}</h1>
            <p className="py-6">{props.data.message}</p>
            <div className="max-w-md py-6 ">
              <h2 className="text-2xl font-bold">Questions</h2>
              <ul>
                {props.data.questions.map((question, index) => {
                  return <li key={index}>{question.question}</li>;
                })}
              </ul>
            </div>
            <div className="flex-auto py-6 ">
              <button onClick={openModal} className="btn-secondary btn mr-10">
                Record Video
              </button>
              <button onClick={openModal2} className="btn-primary btn">
                Text Testimony
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreateVideo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videoFormStep={videoFormStep}
        setVideoFormStep={setVideoFormStep}
        spaceId={props.data}
      />
      <CreateText isOpen2={isOpen2} setIsOpen2={setIsOpen2} spaceId={props.data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  const { data, error } = await supabase.from('spaces').select().eq('name', id).single();

  if (error) {
    return {
      props: {},
    };
  }
  console.log(data);

  return {
    props: {
      data: data,
    },
  };
};

export default Walls;
