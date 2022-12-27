


export const LoveCards = () => {
    return (
        <>
            <div className="card w-auto bg-base-100 shadow-md hover:shadow-2xl mb-5  break-inside-avoid ">
                <div className="card-body">

                    <div>
                        <div className="flex items-center my-2">
                            <div className="avatar mr-2  ">
                                <div className="w-10 mask mask-squircle">
                                    <img src="https://placeimg.com/192/192/people"/>

                                </div>
                            </div>
                            <div className="items-center ">
                                <p className="text-accent text-md font-bold">Andrew Tate</p>
                                <p className="text-accent text-sm ">@topG</p>

                            </div>

                        </div>


                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies volutpat
                            convallis. In sollicitudin ante pellentesque, lobortis elit eu, condimentum urna.
                            Phasellus ultricies nisl at euismod </p>
                    </div>

                    <div className="rating rating-xs">
                        <input type="radio" name="rating-1" className="mask mask-star"/>
                        <input type="radio" name="rating-1" className="mask mask-star" checked/>
                        <input type="radio" name="rating-1" className="mask mask-star"/>
                        <input type="radio" name="rating-1" className="mask mask-star"/>
                        <input type="radio" name="rating-1" className="mask mask-star"/>
                    </div>
                    <p className="text-accent text-sm font-base">2022/02/25 9:10PM</p>

                </div>
            </div>
        </>
    )
}
