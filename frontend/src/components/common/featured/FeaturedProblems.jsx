import { Link } from "react-router-dom";
import ProblemCard from "./ProblemCard.jsx";

const featuredProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Easy",
    tags: ["Math", "Linked List"],
  },
  {
    id: 3,
    title: "Binary Search",
    difficulty: "Medium",
    tags: ["Binary Search"],
  },
  {
    id: 4,
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Sorting", "Greedy"],
  },
];

function FeaturedProblems() {
  return (
    <section className="relative py-28 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[300px] blur-[120px] opacity-10 pointer-events-none" style={{background: "var(--accent)"}} />
      <div className="max-w-7xl mx-auto">

        {/* Lift Section Heading */}
        <div className="text-center mb-16">

          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Start Solving
          </h2>

          <p
            className="mt-5 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Hand-picked coding challenges to kickstart your journey.
          </p>

        </div>

        {/* Problem Grid */}

        <div className="grid gap-8 lg:gap-10 sm:grid-cols-2 xl:grid-cols-4">

          {featuredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
            />
          ))}

        </div>

        {/* Bottom Button */}

        <div className="flex justify-center mt-16">

          <Link
            to="/problems"
            className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            Explore All Problems →
          </Link>

        </div>

      </div>
    </section>
  );
}

export default FeaturedProblems;