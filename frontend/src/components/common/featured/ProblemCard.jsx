import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProblemCard({ problem }) {
  const difficultyColor = {
    Easy: "#3ECF8E",
    Medium: "#F5B041",
    Hard: "#E74C3C",
  };

  return (
    <div
      className="group relative rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
      style={{
        background: "rgba(38,38,37,0.65)",
        borderColor: "var(--border)",
        backdropFilter: "blur(18px)",
      }}
    >
      {/* Lift Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(239,211,149,0.15), transparent 70%)",
        }}
      />

      {/* Difficulty Badge */}

      <div className="relative flex justify-between items-start mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
          style={{
            background: `${difficultyColor[problem.difficulty]}20`,
            color: difficultyColor[problem.difficulty],
          }}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* Title */}

      <h3
        className="relative text-2xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {problem.title}
      </h3>

      {/* Tags */}

      <div className="relative flex flex-wrap gap-2 mb-8">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs"
            style={{
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Solve Button */}

      <Link
        to={`/problems/${problem.id}`}
        className="relative flex items-center justify-between rounded-2xl px-5 py-3 font-semibold transition-all duration-300 group-hover:scale-[1.02]"
        style={{
          background: "var(--accent)",
          color: "var(--bg-primary)",
        }}
      >
        Solve Problem

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

export default ProblemCard;