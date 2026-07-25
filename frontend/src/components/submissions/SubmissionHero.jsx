import {
    FileText,
    CheckCircle2,
    Zap,
    Code2,
} from "lucide-react";

export default function SubmissionHero() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-yellow-500/10 bg-zinc-900 px-8 py-8 shadow-xl">

            {/* Glow */}

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative">

                {/* Badge */}

                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">

                    <FileText
                        size={16}
                        className="text-yellow-400"
                    />

                    <span className="text-sm font-medium text-yellow-300">

                        Your Activity

                    </span>

                </div>

                {/* Title */}

                <h1 className="mt-6 text-5xl font-bold text-white">

                    Submission History

                </h1>

                {/* Description */}

                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">

                    Review every solution you've submitted, inspect verdicts,
                    and keep track of your coding journey on JudgeX.

                </p>

                {/* Chips */}

                <div className="mt-8 flex flex-wrap gap-4">

                    <HeroChip
                        icon={<CheckCircle2 size={18} />}
                        text="Accepted Solutions"
                    />

                    <HeroChip
                        icon={<Zap size={18} />}
                        text="Execution Results"
                    />

                    <HeroChip
                        icon={<Code2 size={18} />}
                        text="Multi-language"
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
                transition-all
                duration-300
                hover:border-yellow-500/20
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