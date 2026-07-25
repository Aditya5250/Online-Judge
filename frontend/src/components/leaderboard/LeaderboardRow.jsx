

export default function LeaderboardRow({ user }) {

    const initials = user.fullname
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-[80px_1.8fr_120px_140px_140px]
                items-center
                gap-4
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-6
                py-5
                transition-all
                duration-300
                hover:border-yellow-500/20
                hover:bg-zinc-800/70
                hover:-translate-y-1
            "
        >

            {/* Rank */}

            <div>

                <span className="rounded-full bg-zinc-800 px-4 py-2 font-bold text-yellow-400">

                    #{user.rank}

                </span>

            </div>

            {/* User */}

            <div className="flex items-center gap-4">

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-yellow-500
                        to-amber-600
                        font-bold
                        text-white
                    "
                >

                    {initials}

                </div>

                <div>

                    <h3 className="font-semibold text-white">

                        {user.fullname}

                    </h3>

                    <p className="text-sm text-zinc-500">

                        @{user.username}

                    </p>

                </div>

            </div>

            {/* Solved */}

            {/* Solved */}

            <div className="flex justify-center">

                <span className="font-semibold text-green-400">
                    {user.solved}
                </span>

            </div>

            {/* Accuracy */}

            <div className="flex justify-center">

                <span className="font-semibold text-blue-400">
                    {user.acceptanceRate}%
                </span>

            </div>

            {/* Attempts */}

            <div className="flex justify-center">

                <span className="font-semibold text-zinc-300">
                    {user.submissions}
                </span>

            </div>

        </div>

    );

}