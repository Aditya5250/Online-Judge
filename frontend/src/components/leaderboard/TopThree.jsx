

import PodiumCard from "./PodiumCard";
import { Trophy } from "lucide-react";

export default function TopThree({ users }) {

    return (

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-xl" >

            <div className="mb-10 text-center">

                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">

                    <Trophy
                        size={16}
                        className="text-yellow-400"
                    />

                    <span className="text-yellow-300 text-sm font-medium">

                        Hall of Fame

                    </span>

                </div>

                <h2 className="mt-5 text-3xl font-bold text-white">

                    Top Performers

                </h2>

                <p className="mt-3 text-zinc-400 pb-2">

                    Meet the programmers currently leading JudgeX.

                </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-3">

                <PodiumCard
                    
                    user={users[1]}
                    place={2}

                />

                <PodiumCard
                    user={users[0]}
                    place={1}
                />

                <PodiumCard
                    user={users[2]}
                    place={3}
                />

            </div>

        </section>

    );

}