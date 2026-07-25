

import LeaderboardRow from "./LeaderboardRow";

export default function LeaderboardTable({ users }) {

    return (

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">

            {/* Header */}

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Community Rankings
                </h2>

                <p className="mt-2 text-zinc-400">
                    Every accepted solution brings you one step closer to the top.
                </p>

            </div>

            {/* Column Headings */}

            <div
                className="
                    hidden
                    md:grid
                    grid-cols-[80px_1.8fr_120px_140px_140px]
                    px-6
                    pb-4
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wide
                    text-zinc-500
                "
            >

                <span >Rank</span>

                

                <span>User</span>

                <span >Solved</span>

                <span>Accuracy</span>

                <span>Attempts</span>

            </div>

            {/* Rows */}

            <div className="space-y-3">

                {users.map(user => (

                    <LeaderboardRow
                        key={user.rank}
                        user={user}
                    />

                ))}

            </div>

        </section>

    );

}