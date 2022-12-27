


export const LoveCardsVideo = () => {
    return (
        <>
            <div className="card w-auto bg-base-100 shadow-md hover:shadow-2xl mb-5 break-inside-avoid">
                <div className="card-body">

                    <div>
                        <div className="flex items-center my-2 ">
                            <div className="avatar mr-2 ">
                                <div className="w-10 mask mask-squircle">
                                    <img src="https://placeimg.com/192/192/people"/>
                                </div>
                            </div>
                            <div className="items-center ">
                                <p className="text-accent text-md font-bold">Andrew Tate</p>
                                <p className="text-accent text-sm ">@topG</p>

                            </div>

                        </div>
                        <video src={"https://nyc3.s3.qencode.com/qencode-video-db/per-title-encoding-demo/big_buck_bunny_optimized.mp4"} controls={true} className="w-auto h-auto aspect-video"/>
                    </div>

                    <p className="text-accent text-sm font-base">2022/02/25 9:10PM</p>

                </div>
            </div>
        </>
    )
}
