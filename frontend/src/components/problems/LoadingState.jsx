function LoadingState(){
    return (
        <div
            className="
                rounded-3xl
                border
                overflow-hidden
            "
            style={{
                background:"rgba(38,38,37,0.65)",
                borderColor:"var(--border)",
            }}
        >
            {[1,2,3,4,5].map((item)=>(

                <div
                    key={item}
                    className="
                        animate-pulse
                        grid
                        grid-col-12

                        items-center
                        gap-4

                        px-6
                        py-6
                        border-b
                    "

                    style={{
                        borderColor:"var(--border)",
                    }}
                >
                    {/* Number */}
                    <div
                        className="
                            col-span-1
                        "
                    >
                        <div className=" h-4 w-6 rounded bg-white/10 " />

                    </div>

                    {/* Title */}
                    <div
                        className="
                            col-span-5
                        "
                    >
                        <div className=" h-5 w-3/4 rounded bg-white/10 " />
                    </div>
                    {/* Tags */}
                    <div className="col-span-3 flex gap-2">
                        <div className="h-6 w-6 rounded-full bg-white/10" />
                        <div className="h-6 w-20 rounded-full bg-white/10" />
                    </div>

                    {/* Difficulty */}
                    <div className="col-span-2">
                        <div className="h-6 w-20 rounded-full bg-white/10" />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-1 flex justify-end">
                        <div className="h-5 w-12 rounded-full bg-white/10" />

                    </div>

                </div>
            ))}

        </div>
    )
}

export default LoadingState;