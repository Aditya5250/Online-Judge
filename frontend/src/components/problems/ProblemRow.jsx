import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DifficultyBadge from "./DifficultyBadge";

function ProblemRow({ problem,index }) {
    return (
        <>
            {/* ---------------- Desktop ---------------- */}

            <div
                className="
                    hidden
                    md:grid
                    grid-cols-12
                    items-center

                    px-6
                    py-5

                    border-b

                    transition-all
                    duration-300

                    hover:bg-white/5
                "
                style={{
                    borderColor: "var(--border)",
                }}
            >
                {/* Index */}

                <div
                    className="col-span-1 font-medium"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    {index + 1}
                </div>

                {/* Title */}

                <div
                    className="col-span-5 font-semibold"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {problem.title}
                </div>

                {/* Tags */}

                <div className="col-span-3 flex flex-wrap gap-2">
                    {problem.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                                background: "rgba(255,255,255,.05)",
                                color: "var(--text-secondary)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Difficulty */}

                <div className="col-span-2">
                    <DifficultyBadge
                        difficulty={problem.difficulty}
                    />
                </div>

                {/* Action */}

                <div className="col-span-1 flex justify-end">
                    <Link
                        to={`/problems/${problem.slug}`}
                        className="
                            flex
                            items-center
                            gap-2

                            font-medium

                            transition-all
                            duration-300

                            hover:translate-x-1
                        "
                        style={{
                            color: "var(--accent)",
                        }}
                    >
                        Solve

                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* ---------------- Mobile ---------------- */}

            <div
                className="
                    md:hidden

                    p-5

                    border-b

                    space-y-4
                "
                style={{
                    borderColor: "var(--border)",
                }}
            >
                <div className="flex justify-between items-start">

                    <h3
                        className="font-semibold text-lg"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {problem.title}
                    </h3>

                    <DifficultyBadge
                        difficulty={problem.difficulty}
                    />

                </div>

                <div className="flex flex-wrap gap-2">
                    {problem.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                                background: "rgba(255,255,255,.05)",
                                color: "var(--text-secondary)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <Link
                    to={`/problems/${problem.slug}`}
                    className="
                        inline-flex
                        items-center
                        gap-2

                        font-medium
                    "
                    style={{
                        color: "var(--accent)",
                    }}
                >
                    Solve

                    <ArrowRight size={16} />
                </Link>
            </div>
        </>
    );
}

export default ProblemRow;