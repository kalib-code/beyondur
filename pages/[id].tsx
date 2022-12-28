import Head from 'next/head'
import {useRouter} from "next/router";
import {IconChevronsDown} from "@tabler/icons";
import {LoveCards} from "@/components/LoveCards";
import {LoveCardsVideo} from "@/components/VideoLoveCard";
import {NavBar} from "@/components/NavBar";


export default function Spaces() {
    const router = useRouter ()
    const { id } = router.query
    const handleAction = () => {
        router.push ( '/m/[id]', `/m/${id}` )
    }
    return (
        <div className="bg-dotted-gray-100 bg-dotted-spacing-4  bg-dotted-gray-300">
            <Head>
                <title>{id}</title>
            </Head>
            <NavBar/>
            <div className="grid place-items-center container mx-auto my-20  ">
                <div>
                    <h1 className="text-accent text-6xl font-bold">
                        Don’t take our word for it.
                    </h1>
                </div>
                <div>
                    <h1 className="text-accent text-6xl font-bold">
                        Hear from the people change by God.
                    </h1>

                </div>
                <div className="flex justify-center my-10">
                    <button onClick={handleAction} className="btn">Leave a testimony</button>
                </div>
                <IconChevronsDown className="mt-15" size={30}/>
            </div>
            <div className="container mx-auto ">
                <div className="columns-3 gap-8 h-full columns-1xs ">
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCards/>
                    <LoveCardsVideo/>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps( context: { query: { id: any; }; } ) {
    // call an external API endpoint to get posts

    const { id } = context.query
    return {
        props : { id }, // will be passed to the page component as props
    }
}
