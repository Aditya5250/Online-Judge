import {
    Trophy,
    Users,
    Target,
    Zap,
} from "lucide-react";

export default function LeaderboardHero() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-yellow-500/10 bg-zinc-900 px-8 py-8 shadow-xl">

            {/* Golden Glow */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-yellow-500/5 blur-3xl" />

            {/* Trophy */}
            <Trophy
                className="absolute right-10 top-1/2 hidden -translate-y-1/2 text-yellow-400/10 lg:block"
                size={170}
                strokeWidth={1}
            />

            <div className="relative">

                {/* Badge */}

                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">

                    <Trophy
                        size={16}
                        className="text-yellow-400"
                    />

                    <span className="text-sm font-medium text-yellow-300">
                        Global Rankings
                    </span>

                </div>

                {/* Heading */}

                <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">

                    Leaderboard

                </h1>

                {/* Description */}

                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">

                    Climb the rankings, solve more problems, improve your
                    accuracy, and become one of JudgeX's top programmers.

                </p>

                {/* Chips */}

                <div className="mt-8 flex flex-wrap gap-4">

                    <HeroChip
                        icon={<Users size={18} />}
                        text="Live Rankings"
                    />

                    <HeroChip
                        icon={<Target size={18} />}
                        text="Solve Problems"
                    />

                    <HeroChip
                        icon={<Zap size={18} />}
                        text="Improve Accuracy"
                    />

                </div>

            </div>

        </section>
    );
}

function HeroChip({ icon, text }) {
    return (
        <div
            className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-zinc-700
                bg-zinc-800/70
                px-4
                py-3
                text-zinc-300
                backdrop-blur
                transition-all
                duration-300
                hover:border-yellow-500/20
                hover:bg-zinc-800
                hover:text-yellow-300
            "
        >
            {icon}

            <span className="text-sm font-medium">

                {text}

            </span>

        </div>
    );
}