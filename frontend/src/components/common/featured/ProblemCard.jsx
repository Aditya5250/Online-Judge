import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProblemCard({ problem }) {
    const difficulty =
        problem.difficulty.charAt(0) +
        problem.difficulty.slice(1).toLowerCase();

    const difficultyColors = {
        Easy: {
            bg: "rgba(34,197,94,0.15)",
            text: "#22C55E",
        },
        Medium: {
            bg: "rgba(245,158,11,0.15)",
            text: "#F59E0B",
        },
        Hard: {
            bg: "rgba(239,68,68,0.15)",
            text: "#EF4444",
        },
    };

    const color = difficultyColors[difficulty] || difficultyColors.Easy;

    return (
        <div
            className="rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{
                background: "rgba(38,38,37,0.65)",
                borderColor: "var(--border)",
            }}
        >
            {/* Difficulty Badge */}
            <span
                className="w-fit px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{
                    background: color.bg,
                    color: color.text,
                }}
            >
                {difficulty}
            </span>

            {/* Title */}
            <h3
                className="text-3xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
            >
                {problem.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                {problem.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Solve Button */}
            <Link
                to={`/problems/${problem.slug}`}
                className="flex items-center justify-between px-6 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                }}
            >
                <span>Solve Problem</span>
                <ArrowRight size={18} />
            </Link>
        </div>
    );
}

export default ProblemCard;