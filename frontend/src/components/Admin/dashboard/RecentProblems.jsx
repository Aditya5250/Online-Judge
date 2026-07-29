import { BadgeCheck, Clock3 } from "lucide-react";

function getDifficultyColor(difficulty) {
    switch (difficulty) {
        case "EASY":
            return "bg-green-500/20 text-green-400";

        case "MEDIUM":
            return "bg-yellow-500/20 text-yellow-400";

        case "HARD":
            return "bg-red-500/20 text-red-400";

        default:
            return "bg-zinc-700 text-zinc-300";
    }
}

function getRelativeDate(date) {

    const now = new Date();
    const created = new Date(date);

    const diff = Math.floor(
        (now - created) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Today";

    if (diff === 1) return "Yesterday";

    return `${diff} days ago`;
}

export default function RecentProblems({ problems }) {

    return (

        <div
            className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
            "
        >

            <h2 className="text-2xl font-bold text-white">
                Recent Problems
            </h2>

            <p className="text-zinc-400 mt-1">
                Recently created coding problems
            </p>

            <div className="mt-6 space-y-5">

                {problems.map((problem) => (

                    <div
                        key={problem._id}
                        className="
                            border-b
                            border-zinc-800
                            pb-4
                            last:border-none
                            last:pb-0
                        "
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h3 className="font-semibold text-white">
                                    {problem.title}
                                </h3>

                                <div className="flex gap-2 mt-2">

                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            ${getDifficultyColor(problem.difficulty)}
                                        `}
                                    >
                                        {problem.difficulty}
                                    </span>

                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            ${
                                                problem.isPublished
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-zinc-700 text-zinc-300"
                                            }
                                        `}
                                    >
                                        {problem.isPublished
                                            ? "Published"
                                            : "Draft"}
                                    </span>

                                </div>

                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    text-zinc-400
                                    text-sm
                                "
                            >
                                <Clock3 size={14} />

                                {getRelativeDate(problem.createdAt)}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}